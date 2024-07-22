import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  getAllLibrary,
  createBook,
  getOneBook,
  modifyBook,
  deleteBook,
} from "../controllers/library.js";

const libraryRouter = Router();
libraryRouter.get("/books/", getAllLibrary);
libraryRouter.post("/", auth, createBook);
libraryRouter.get("/books/:id", getOneBook);
libraryRouter.put("/books/:id", auth, modifyBook);
libraryRouter.delete("/books/:id", auth, deleteBook);

export default libraryRouter;
