import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import AlertDialogComponent from "./component/AlertDialogComponent";
import { useState, useContext } from "react";
import AddBookDialog from "./component/dialogs/AddBookAlertDialog";
import { Button } from "./components/ui/button";
import { Toaster } from "react-hot-toast";
import TableComponent from "./component/TableComponent";
import { TableCell, TableHead, TableRow } from "./components/ui/table";
import { BookAIcon, DeleteIcon, Edit2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetBooks } from "./api/useApi";
import toast from "react-hot-toast";
import DeleteBookAlertDialog from "./component/dialogs/DeleteBookAlertDialog";
import EditBookDialog from "./component/dialogs/EditBookDialog";
import InputComponent from "./component/inputs/InputComponent";
function App() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalDeleteContent, setDeleteContent] = useState(null);
  const [modalEditContent, setEditContent] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [bookData, setBook] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookPublishYear: "",
  });

  const queryClient = useQueryClient();
  const onSuccess = (data) => {
    console.log(data.message);
    toast.success(data.message);
    queryClient.invalidateQueries();
  };

  const deleteModalContent = (bookTitle) => (
    <>
      Do you want to delete the book entitled
      <span className="text-rose-600 text-base text-bold"> {bookTitle}</span>
    </>
  );

  const onError = (err) => {
    console.log(err.message);
    toast.error(err.message);
  };
  const {
    data: books,
    isError,
    isFetched,
    isLoading,
    isPending,
  } = useGetBooks({
    onSuccess,
    onError,
  });

  const handleInputChange = (e) => {
    setBook({ ...bookData, [e.target.name]: e.target.value });
    console.log(bookData.bookTitle);
  };

  const editModalContent = (book) => (
    <form>
      <InputComponent
        label={"Title"}
        type={"text"}
        placeholder={"Add Book Title"}
        name="bookData"
        value={bookData.bookTitle}
        onChange={handleInputChange}
      />
      <InputComponent
        label={"Author"}
        type={"text"}
        placeholder={"Add Book Author"}
        name="bookAuthor"
        value={book.bookAuthor}
        onChange={handleInputChange}
      />
      <InputComponent
        type={"date"}
        label={"Publish year"}
        placeholder={"Add Book Publish Year"}
        name="bookPublishYear"
        value={book.bookPublishYear}
        onChange={handleInputChange}
      />
    </form>
  );

  return (
    <div className="container sm:container md:container lg:container">
      <div className="">
        {
          <AddBookDialog
            openAddModal={openAddModal}
            setOpenAddModal={setOpenAddModal}
          />
        }
        <AlertDialog>
          <AlertDialogTrigger
            className="flex gap-2 bg-secondary p-4 rounded-sm mt-5"
            onClick={() => {
              setOpenAddModal(!openAddModal);
            }}
          >
            <BookAIcon /> Add Book
          </AlertDialogTrigger>
        </AlertDialog>
      </div>
      <TableComponent
        tableTitle={"List of books"}
        tableHeader={
          <TableRow>
            <TableHead className="w-[100px]">Book Title</TableHead>
            <TableHead>Book Author</TableHead>
            <TableHead>Book Publish Year</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        }
        tableBody={
          <>
            {books?.map((book) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">{book.bookTitle}</TableCell>
                <TableCell>{book.bookAuthor}</TableCell>
                <TableCell>{book.bookPublishYear}</TableCell>
                <TableCell className="text-right flex gap-2 sm:flex flex-col">
                  <EditBookDialog
                    openEditModal={openEditModal}
                    setOpenEditModal={setOpenEditModal}
                    editModalContent={modalEditContent}
                    book={book}
                    bookId={bookId}
                  />
                  <Button
                    onClick={() => {
                      setEditContent(editModalContent(book));
                      setOpenEditModal(!openEditModal);
                      setBookId(book._id);
                    }}
                    className={"flex flex-row-reverse gap-2 "}
                  >
                    <Edit2Icon /> Edit
                  </Button>

                  <DeleteBookAlertDialog
                    bookId={bookId}
                    openDeleteModal={openDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    deleteModalContent={modalDeleteContent}
                  />

                  <Button
                    variant="destructive"
                    className={"flex flex-row-reverse gap-2"}
                    onClick={() => {
                      setDeleteContent(deleteModalContent(book.bookTitle));
                      setOpenDeleteModal(!openDeleteModal);
                      setBookId(book._id);
                    }}
                  >
                    <DeleteIcon />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
      <Toaster />
    </div>
  );
}

export default App;
