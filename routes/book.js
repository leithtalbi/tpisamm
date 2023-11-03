const express = require("express");
const router = express.Router();
const book = require("../models/book");
const bookController = require("../controllers/book");

router.post("/", bookController.addBook);

router.get("/", bookController.getBook);

router.get("/:id", bookController.getBookById);

router.patch("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);
module.exports = router;



