import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function TableComponent({ className, tableTitle, tableHeader, tableBody }) {
  return (
    <Table className={className}>
      <TableCaption>{tableTitle}</TableCaption>
      <TableHeader>{tableHeader}</TableHeader>
      <TableBody>{tableBody}</TableBody>
    </Table>
  );
}

export default TableComponent;
