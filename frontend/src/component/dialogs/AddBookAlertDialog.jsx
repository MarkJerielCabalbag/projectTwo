import AlertDialogComponent from "../AlertDialogComponent";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import InputComponent from "../inputs/InputComponent";
import { useCreateBook } from "@/api/useApi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import AddBookForm from "../forms/AddBookForm";
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
  };
  const onError = (err) => {
    console.log(err.message);
    toast.error(err.message);
  };

  const { mutateAsync, isError, isPending, isSuccess, isLoading, error, data } =
    useCreateBook({
      onSuccess,
      onError,
    });

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
              <AddBookForm book={book} setBook={setBook} />
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

                    await mutateAsync({
                      bookTitle: book.bookTitle,
                      bookAuthor: book.bookAuthor,
                      bookPublishYear: book.bookPublishYear,
                    });
                    setBook({
                      bookTitle: "",
                      bookAuthor: "",
                      bookPublishYear: "",
                    });
                    queryClient.invalidateQueries();

                    setOpenAddModal(!openAddModal);
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
