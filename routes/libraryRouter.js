import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer-config.js";

import {
  getAllLibrary,
  createBook,
  rateBook,
  getOneBook,
  modifyBook,
  deleteBook,
  getBooksByBestRating,
} from "../controllers/library.js";

const libraryRouter = Router();
libraryRouter.get("/books/", getAllLibrary);
libraryRouter.get("/books/bestrating/", getBooksByBestRating);
libraryRouter.post("/books/", auth, upload, createBook);
libraryRouter.post("/books/:id/rating/", rateBook);
libraryRouter.get("/books/:id", getOneBook);
libraryRouter.put("/books/:id", auth, upload, modifyBook);
libraryRouter.delete("/books/:id", auth, deleteBook);

export default libraryRouter;
