import express from "express";
import bookControllers from "../controllers/bookControllers.js";

const bookRouter = express.Router();

//create a book
bookRouter.post("/createBook", bookControllers.createBook);
//get all books

bookRouter.get("/getBooks", bookControllers.getBooks);

//get a book

//update a book
bookRouter.put("/updateBook/:id", bookControllers.updateBook);

//delete a book
bookRouter.delete("/deleteBook/:id", bookControllers.deleteBook);

export default bookRouter;
