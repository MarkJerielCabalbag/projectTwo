import { AlertDialog } from "@radix-ui/react-alert-dialog";
import React from "react";
import AlertDialogComponent from "../AlertDialogComponent";
import { BookDown, DeleteIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteBook } from "@/api/useApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
function DeleteBookAlertDialog({
  deleteModalContent,
  openDeleteModal,
  setOpenDeleteModal,
  bookId,
}) {
  const queryClient = useQueryClient();
  const onSuccess = (data) => {
    console.log("A book Successfully deleted");
    toast.success(data.message);
    queryClient.invalidateQueries();
  };

  const onError = (err) => {
    console.log(err.message);
    toast.error(err.message);
  };

  const { mutateAsync, isPending, isLoading } = useDeleteBook({
    onSuccess,
    onError,
  });

  return (
    <>
      {openDeleteModal && (
        <AlertDialogComponent
          open={openDeleteModal}
          onOpenChange={setOpenDeleteModal}
          alertDialogTitle={
            <div className="flex gap-2 align-center">
              <BookDown />
              Delete a Book
            </div>
          }
          alertDialogDescription={deleteModalContent}
          alertDialogFooter={
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenDeleteModal(!openDeleteModal);
                }}
              >
                Close
              </Button>
              <Button
                onClick={async () => {
                  try {
                    await mutateAsync(bookId);
                    console.log(bookId);
                    setOpenDeleteModal(!openDeleteModal);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {isPending || isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          }
        />
      )}
    </>
  );
}

export default DeleteBookAlertDialog;
