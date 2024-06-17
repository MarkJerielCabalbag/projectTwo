import AlertDialogComponent from "../AlertDialogComponent";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import InputComponent from "../inputs/InputComponent";
import { useCreateBook } from "@/api/useApi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
function AddBookDialog({ openAddModal, setOpenAddModal }) {
  const [book, setBook] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookPublishYear: "",
  });
  const queryClient = useQueryClient();
  const onSuccess = (data) => {
    console.log("Added a new book");
    toast.success(data.message);
    queryClient.invalidateQueries();
  };
  const onError = (err) => {
    console.log(err.message);
    toast.error(err.message);
  };
  const { bookTitle, bookAuthor, bookPublishYear } = book;
  const { mutateAsync, isError, isPending, isSuccess, isLoading, error, data } =
    useCreateBook({
      onSuccess,
      onError,
    });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    console.log(book);
  };

  useEffect(() => {
    if (isError) toast.error(error.message);
    if (isSuccess) toast.success(data.message);
  }, [isError, isLoading, isPending, isSuccess, error, data]);
  return (
    <>
      {openAddModal && (
        <AlertDialogComponent
          alertDialogTitle={"Add Book"}
          open={openAddModal}
          onOpenChange={setOpenAddModal}
          alertDialogDescription={
            <>
              <form>
                <InputComponent
                  label={"Title"}
                  placeholder={"Add Book Title"}
                  name="bookTitle"
                  value={bookTitle}
                  onChange={handleInputChange}
                />
                <InputComponent
                  label={"Author"}
                  placeholder={"Add Book Author"}
                  name="bookAuthor"
                  value={bookAuthor}
                  onChange={handleInputChange}
                />
                <InputComponent
                  label={"Publish year"}
                  placeholder={"Add Book Publish Year"}
                  name="bookPublishYear"
                  value={bookPublishYear}
                  onChange={handleInputChange}
                />
              </form>
            </>
          }
          alertDialogFooter={
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenAddModal(!true);
                  console.log("Add Book modal Closed");
                }}
              >
                Close
              </Button>
              <Button
                onClick={async () => {
                  try {
                    if (
                      book.bookAuthor === "" ||
                      book.bookTitle === "" ||
                      book.bookPublishYear === ""
                    ) {
                      toast.error("Please fill in all fields");
                      setOpenAddModal(openAddModal);
                      return;
                    }

                    setBook({
                      bookTitle: "",
                      bookAuthor: "",
                      bookPublishYear: "",
                    });
                    await mutateAsync({
                      bookTitle,
                      bookAuthor,
                      bookPublishYear,
                    });
                    toast.success(data.message);
                    setOpenAddModal(!true);
                  } catch (err) {
                    setBook({
                      bookTitle: "",
                      bookAuthor: "",
                      bookPublishYear: "",
                    });
                  }
                }}
              >
                {isPending || isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          }
        />
      )}
    </>
  );
}

export default AddBookDialog;
