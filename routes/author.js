const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const authorController = require("../controllers/author");

router.post("/", authorController.addAuthor);

router.get("/", authorController.getAuthor);

router.get("/:id", authorController.getAuthorById);

router.patch("/:id", authorController.updateAuthor);

router.delete("/:id", authorController.deleteAuthor);
module.exports = router;