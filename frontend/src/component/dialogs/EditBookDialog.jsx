import React from "react";
import AlertDialogComponent from "../AlertDialogComponent";
import { Button } from "@/components/ui/button";
import { Edit3Icon, Loader2Icon } from "lucide-react";
import { useUpdateBook } from "@/api/useApi";
import InputComponent from "../inputs/InputComponent";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
function EditBookDialog({
  editModalContent,
  bookId,
  openEditModal,
  setOpenEditModal,
  book,
}) {
  const queryClient = useQueryClient();
  const onError = (err) => {
    toast.error(err.message);
    console.log(err.message);
  };
  const onSuccess = (data) => {
    console.log(data.message);
    toast.success(data.message);
    queryClient.invalidateQueries();
  };
  const [editBook, setEditBook] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookPublishYear: "",
  });
  const { mutateAsync, isPending, isError, isSuccess, isLoading } =
    useUpdateBook({
      onSuccess,
      onError,
    });
  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditBook({ ...editBook, [name]: value });
    console.log(editBook);
  };

  return (
    <>
      {openEditModal && (
        <AlertDialogComponent
          open={openEditModal}
          onOpenChange={setOpenEditModal}
          alertDialogTitle={
            <div className="flex gap-2 align-center">
              <Edit3Icon />
              Edit a book a Book
            </div>
          }
          alertDialogDescription={
            <>
              {/* <form>
                <InputComponent
                  label={"New Book Title"}
                  type={"text"}
                  placeholder={"Edit title book"}
                  name="bookTitle"
                  onChange={handleInputChangeEdit}
                  value={editBook.bookTitle}
                />
                <InputComponent
                  label={"New Book Author"}
                  type={"text"}
                  placeholder={"Edit author book"}
                  name="bookAuthor"
                  onChange={handleInputChangeEdit}
                  value={editBook.bookAuthor}
                />
                <InputComponent
                  label={"New Book Publish Year"}
                  type={"date"}
                  placeholder={"Edit book date"}
                  name="bookPublishYear"
                  onChange={handleInputChangeEdit}
                  value={editBook.bookPublishYear}
                />
              </form> */}
              {editModalContent}
            </>
          }
          alertDialogFooter={
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenEditModal(!openEditModal);
                }}
              >
                Close
              </Button>
              <Button
                onClick={async () => {
                  try {
                    await mutateAsync({
                      id: bookId,
                      bookTitle: editBook.bookTitle,
                      bookAuthor: editBook.bookAuthor,
                      bookPublishYear: editBook.bookPublishYear,
                    });
                    setOpenEditModal(!openEditModal);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {isPending || isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          }
        />
      )}
    </>
  );
}

export default EditBookDialog;
