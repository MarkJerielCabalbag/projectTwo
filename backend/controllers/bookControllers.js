import Book from "../models/bookModel.js";

//@desc     Create a book
//@routes   POST api/book/createBook
const createBook = async (req, res, next) => {
  //get req body from client
  const { bookTitle, bookAuthor, bookPublishYear } = req.body;

  //validate req
  if (!bookTitle || !bookAuthor || !bookPublishYear) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  //find book title duplication in the db
  const bookTitleDuplication = await Book.findOne({ bookTitle });

  if (bookTitleDuplication) {
    return res.status(400).json({
      message: `Book title ${bookTitle} has a duplication`,
    });
  }

  //if no duplication create now in the db
  const createdNewBook = await Book.create({
    bookTitle,
    bookAuthor,
    bookPublishYear,
  });

  res.status(200).json({
    message: `Book title ${createdNewBook.bookTitle} is now successfully created`,
  });
};

//@desc     GET a book
//@routes   GET api/book/getBooks
const getBooks = async (req, res, next) => {
  //get all books
  const books = await Book.find({});
  //then return it
  res.status(200).json(books);
};

//@desc     UPDATE a book
//@routes   PUT api/book/updateBook/:id
const updateBook = async (req, res, next) => {
  //get all the req body from client
  const { bookTitle, bookAuthor, bookPublishYear } = req.body;

  //validate req
  if (!bookTitle || !bookAuthor || !bookPublishYear) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  //if found, lets update
  let book = await Book.findById(req.params.id);

  book.bookTitle = bookTitle;
  book.bookAuthor = bookAuthor;
  book.bookPublishYear = bookPublishYear;

  //after saving save it
  book.save();

  res.status(200).json({ message: `${book.id} is now updated` });
};

//@desc     DELETE a book
//@routes   DELETE api/book/deleteBook/:id
const deleteBook = async (req, res, next) => {
  //get id from req body
  const { id } = req.params;

  //find that book by id
  const foundBook = await Book.findById(id);

  //validate id
  if (!foundBook) {
    return res.status(404).json({ message: `Id ${id} not found` });
  }

  //if not, delete the book by id
  await Book.deleteOne({ _id: id });

  res.status(200).json({ message: `Id ${id} is now successfully Deleted` });
};

export default { createBook, getBooks, updateBook, deleteBook };
