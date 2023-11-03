const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const auth = require("../middlewares/auth");

router.post("/", auth.loggedMiddleware, taskController.addTask);

router.get("/", auth.loggedMiddleware, taskController.getTasks);

router.get("/:id", auth.loggedMiddleware, taskController.getTaskById);

router.patch("/:id", auth.loggedMiddleware, taskController.updateTask);

router.delete("/:id", auth.loggedMiddleware, taskController.deleteTask);
module.exports = router;