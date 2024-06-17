import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";

function AlertDialogComponent({
  alertDialogTitle,
  alertDialogDescription,
  alertDialogFooter,
  open,
  onOpenChange,
}) {
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          onOpenChange={onOpenChange}
          className="sm:container md:container lg:container"
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertDialogTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {alertDialogDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>{alertDialogFooter}</AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default AlertDialogComponent;
