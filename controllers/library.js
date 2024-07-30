import Book from "../models/books.js";
import fs from "fs";
import mongoose from "mongoose";

// pour ajouter un nouveau livre
export function createBook(req, res, next) {
  console.log("body==>", req.body);
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    userId: req.auth.userId,
    title: bookObject.title,
    author: bookObject.author,
    year: bookObject.year,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    genre: bookObject.genre,
    ratings: bookObject.ratings,
    averageRating: bookObject.averageRating,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({
        message: "Votre livre a bien été ajouté!",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: error,
      });
    });
}
// Pour trouver un livre en particulier
export function getOneBook(req, res, next) {
  Book.findOne({
    _id: req.params.id,
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        error: error,
      });
    });
}

export function modifyBook(req, res, next) {
  // On récupère le livre
  const bookData = JSON.parse(req.body.book);

  // On crée l'url de la nouvelle image (modifiée ou non)
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

  // On supprime le _userId des données pour éviter de changer le propriétaire
  delete bookData._userId;

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      //Pas possible si l'utilisateur n'est pas le créateur du livre
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "Vous ne vous êtes pas authentifié" });
      } else {
        // On supprime l'ancienne image pour éviter les doublons dans le dossier Backend
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.error(err);
          }
        });

        // Mise à jour des infos du livre
        book.title = bookData.title;
        book.author = bookData.author;
        book.description = bookData.description;
        book.genre = bookData.genre;
        book.imageUrl = imageUrl;

        // EEt on enregistre dans la base données
        Book.updateOne(
          { _id: req.params.id },
          { 
            title: book.title,
            author: book.author,
            description: book.description,
            genre: book.genre,
            imageUrl: book.imageUrl,
            _id: req.params.id 
          }
        )
          .then(() =>
            res.status(200).json({ message: "Votre livre a bien été modifié" })
          )
          .catch((error) => {
            console.error(error);
            res.status(401).json({ error });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error });
    });
}


// Pour noter un livre créé par un autre utilisateur
export function rateBook(req, res, next) {
  console.log("body==>", req.body);

  const { userId, rating } = req.body;
  const bookId = req.params.id; 

  // ID est bien un ObjectId valide ?
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ error: "Identifiant du livre invalide" });
  }

  // D'abord rechercher le livre avec _id
  Book.findOne({ _id: bookId })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Livre non trouvé" });
      }

      // Vérfier qu'un utilisateur ne puisse noter qu'une seule fois
      const existingRating = book.ratings.find((r) => r.userId === userId);

      if (existingRating) {
        // Si note déjà donnée
        existingRating.grade = rating;
      } else {
        // Sinon, on peut mettre une note
        book.ratings.push({ userId, grade: rating });
      }

      // Note moyenne recalculée
      const totalRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
      book.averageRating = totalRatings / book.ratings.length;

      // Sauvegarde + mise à jour du livre 
      book
        .save()
        .then((updatedBook) => {
          res.status(200).json(updatedBook);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
}

//Pour supprimer un livre
export function deleteBook(req, res, next) {
  // D'abord rechercher le livre avec _id
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
      }
      //Pas de suppression possible si l'utilisateur n'est pas le créateur du livre
      if (book.userId != req.auth.userId) {
        return res.status(403).json({ message: "Vous ne pouvez pas supprimer ce livre" });
      }
      //Pour supprimer l'image enregistrée dans le dossier Backend
      const filename = book.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        Book.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Votre livre a bien été supprimé" });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
          });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
}

// Pour afficher toute la librairie à l'accueil
export function getAllLibrary(req, res, next) {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      console.log(error);

      res.status(400).json({
        error: error,
      });
    });
}
// Pour afficher la librairie des mieux notés  (idem que la fonction getAllLibrary ...
export function getBooksByBestRating(req, res, next) {
  Book.find()
    .sort({ averageRating: -1 }) // ... Avec ajout d'un tri...
    .limit(3) // et seulement les 3 premiers livres) 
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
}
