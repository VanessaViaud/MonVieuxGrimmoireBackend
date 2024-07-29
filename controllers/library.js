import Book /*, { findOne, updateOne, deleteOne, find }*/ from "../models/books.js";
import fs from "fs";

export function createBook(req, res, next) {
  console.log("body==>", req.body);
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    // ...bookObject,
    //id: req.body.id,
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

export function getOneBook(req, res, next) {
  Book.findOne({
    _id: req.params.id,
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
}

export function modifyBook(req, res, next) {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Vous ne vous êtes pas authentifié" });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Votre livre a bien été modifié" })
          )
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
}

export function deleteBook(req, res, next) {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Vous ne vous êtes pas authentifié" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res
                .status(200)
                .json({ message: "Votre livre a bien été supprimé" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

export function getAllLibrary(req, res, next) {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
}
