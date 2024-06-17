import connectDB from "./config/connectDB.js";
import express from "express";
import cors from "cors";
import bookRouter from "./routes/bookRouter.js";
import bodyParser from "body-parser";
const PORT = process.env.PORT || 8080;
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/book", bookRouter);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
