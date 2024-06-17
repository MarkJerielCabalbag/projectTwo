import React from "react";
import AlertDialogComponent from "../AlertDialogComponent";
import { Button } from "@/components/ui/button";
import { Edit3Icon } from "lucide-react";

function EditBookDialog({ openEditModal, setOpenEditModal }) {
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
          alertDialogDescription={""}
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
                    setOpenEditModal(!openEditModal);
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
