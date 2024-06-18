import React from "react";
import AlertDialogComponent from "../AlertDialogComponent";
import { Button } from "@/components/ui/button";
import { Edit3Icon } from "lucide-react";
import { useUpdateBook } from "@/api/useApi";
function EditBookDialog({
  book,
  editModalContent,
  openEditModal,
  setOpenEditModal,
  bookId,
}) {
  const onError = () => console.log("hello");
  const onSuccess = () => console.log("hi");
  const { data, mutateAsync } = useUpdateBook({
    onSuccess,
    onError,
  });

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
          alertDialogDescription={editModalContent}
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
                      bookTitle: book.bookTitle,
                      bookAuthor: book.bookAuthor,
                      bookPublishYear: book.bookPublishYear,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              ></Button>
            </div>
          }
        />
      )}
    </>
  );
}

export default EditBookDialog;
