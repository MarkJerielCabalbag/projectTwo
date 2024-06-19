import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import EditBookDialog from "../dialogs/EditBookDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function TableSkeleton() {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className={"w-[100px] h-[20px]"} />
      </TableCell>
      <TableCell>
        <Skeleton className={"w-[100px] h-[20px]"} />
      </TableCell>
      <TableCell>
        <Skeleton className={"w-[240px] h-[20px]"} />
      </TableCell>
      <TableCell className="text-right flex gap-2 sm:flex flex-col">
        <Button variant="ghost">
          <Skeleton className={"w-[120px] h-[37px] bg-primary"} />
        </Button>
        <Button variant="ghost">
          <Skeleton className={"w-[120px] h-[37px] bg-destructive"} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TableSkeleton;
