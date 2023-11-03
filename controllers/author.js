const Author = require("../models/author");

const addAuthor = (req, res) => {
  console.log(req.body);
  const book = new Author(req.body);
  book
    .save()
    .then(() => {
      res.status(201).json({
        model: Author,
        message: "Author créé ",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
};

const getAuthor = (req, res) => {
  Author.find()
    .then((Author) => {
      res.status(200).json({
        model: Author,
        message: "success",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
};

const getAuthorById = (req, res) => {
  console.log(req.params.id);
  Author.findOne({ _id: req.params.id })
    .then((Author) => {
      if (!Author) {
        res.status(404).json({
          message: "Author non trouvé ",
        });
        return;
      }
      res.status(200).json({
        model: Book,
        message: "Author trouvé",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "erreur d'extraction ",
      });
    });
};

const updateAuthor = (req, res) => {
  Author.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((Author) => {
      if (!Author) {
        res.status(404)({
          message: "Author non trouvé",
        });
      }
      res.status(200).json({
        model: Author,
        message: "Author modifié",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "problème d'extraction ",
      });
    });
};
const deleteAuthor = (req, res) => {
  const AuthorId = req.params.id;
  Author.findByIdAndRemove(AuthorId)
    .then((deletedAuthor) => {
      if (deletedAuthor) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Author not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting Author:", error);
      res.status(500).json({ error: "Failed to delete the Author" });
    });
};

module.exports = {
  getAuthor: getAuthor,
  addAuthor: addAuthor,
  getAuthorById: getAuthorById,
  updateAuthor: updateAuthor,
  deleteAuthor: deleteAuthor,
};