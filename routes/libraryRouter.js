import { Router } from "express";

import {
  getAllLibrary,
  createBook,
  getOneBook,
  modifyBook,
  deleteBook,
} from "../controllers/library.js";

const libraryRouter = Router();
libraryRouter.get("/books/", getAllLibrary);
libraryRouter.post("/", createBook);
libraryRouter.get("/books/:id", getOneBook);
libraryRouter.put("/books/:id", modifyBook);
libraryRouter.delete("/books/:id", deleteBook);

export default libraryRouter;
