import { Router } from "express";

import {
  getAllLibrary,
  createBook,
  getOneBook,
  modifyBook,
  deleteBook,
} from "../controllers/library.js";

const router = Router();
router.get("/books/", getAllLibrary);
router.post("/", createBook);
router.get("/books/:id", getOneBook);
router.put("/books/:id", modifyBook);
router.delete("/books/:id", deleteBook);

export default router;
