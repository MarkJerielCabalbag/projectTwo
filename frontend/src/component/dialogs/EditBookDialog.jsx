import React from "react";
import AlertDialogComponent from "../AlertDialogComponent";
import { Button } from "@/components/ui/button";
import { Edit3Icon, Loader2Icon } from "lucide-react";
import { useUpdateBook } from "@/api/useApi";
import InputComponent from "../inputs/InputComponent";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import EditForm from "../forms/EditForm";
function EditBookDialog({
  bookData,
  bookId,
  openEditModal,
  setOpenEditModal,
  setBookData,
  editModalContent,
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
          alertDialogDescription={<>{editModalContent}</>}
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
                      id: bookData._id,
                      bookTitle: bookData.bookTitle,
                      bookAuthor: bookData.bookAuthor,
                      bookPublishYear: bookData.bookPublishYear,
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
