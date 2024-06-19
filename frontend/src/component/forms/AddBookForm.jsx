import React, { useState } from "react";
import InputComponent from "../inputs/InputComponent";

function AddBookForm({ book, setBook }) {
  const { bookTitle, bookAuthor, bookPublishYear } = book;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    console.log(book);
  };
  return (
    <form>
      <InputComponent
        label={"Title"}
        type={"text"}
        placeholder={"Add Book Title"}
        name="bookTitle"
        value={bookTitle}
        onChange={handleInputChange}
      />
      <InputComponent
        label={"Author"}
        type={"text"}
        placeholder={"Add Book Author"}
        name="bookAuthor"
        value={bookAuthor}
        onChange={handleInputChange}
      />
      <InputComponent
        type={"date"}
        label={"Publish year"}
        placeholder={"Add Book Publish Year"}
        name="bookPublishYear"
        value={bookPublishYear}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default AddBookForm;
