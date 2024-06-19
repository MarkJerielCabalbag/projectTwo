import React from "react";
import InputComponent from "../inputs/InputComponent";

function EditForm({ bookData, setBookData }) {
  const handleInputChangeEdit = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form>
      <InputComponent
        label={"New Book Title"}
        type={"text"}
        placeholder={"Edit title book"}
        name="bookTitle"
        onChange={handleInputChangeEdit}
        value={bookData.bookTitle}
      />
      <InputComponent
        label={"New Book Author"}
        type={"text"}
        placeholder={"Edit author book"}
        name="bookAuthor"
        onChange={handleInputChangeEdit}
        value={bookData.bookAuthor}
      />
      <InputComponent
        label={"New Book Publish Year"}
        type={"date"}
        placeholder={"Edit book date"}
        name="bookPublishYear"
        onChange={handleInputChangeEdit}
        value={bookData.bookPublishYear}
      />
    </form>
  );
}

export default EditForm;
