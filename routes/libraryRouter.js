import { Router } from "express"; // routeur d'Express pour gérer les routes
import auth from "../middleware/auth.js"; // middleware d'authentification
import upload from "../middleware/multer-config.js"; // middleware multer pour la gestion des fichiers

// import de toutes nos fonctions contrôleurs
import {
  getAllLibrary,
  createBook,
  rateBook,
  getOneBook,
  modifyBook,
  deleteBook,
  getBooksByBestRating,
} from "../controllers/library.js"; 

// nouveau Router
const libraryRouter = Router(); 

// et on définit toutes nos routes (avec ou non authentification du user et avec ou non téléchargement d'une image)
libraryRouter.get("/books/", getAllLibrary);
libraryRouter.get("/books/bestrating/", getBooksByBestRating);
libraryRouter.post("/books/", auth, upload, createBook);
libraryRouter.post("/books/:id/rating/", rateBook);
libraryRouter.get("/books/:id", getOneBook);
libraryRouter.put("/books/:id", auth, upload, modifyBook);
libraryRouter.delete("/books/:id", auth, deleteBook);

export default libraryRouter; 