import Book /*, { findOne, updateOne, deleteOne, find }*/ from "../models/books.js";

export function createBook(req, res, next) {
  const book = new Book({
    id: req.body.id,
    userId: req.body.userId,
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    ratings: req.body.ratings,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({
        message: "Votre livre a bien été ajouté!",
      });
    })
    .catch((error) => {
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
  const book = new Book({
    id: req.body.id,
    userId: req.body.userId,
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    ratings: req.body.ratings,
  });
  Book.updateOne({ id: req.params.id }, book)
    .then(() => {
      res.status(201).json({
        message: "Votre livre a bien été modifié!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
}

export function deleteBook(req, res, next) {
  Book.deleteOne({ id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Votre livre a bien été upprimé!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
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
