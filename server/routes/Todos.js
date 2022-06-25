const express = require("express");
const router = express.Router();
const { Todos } = require("../models");

router.get("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  const todos = await Todos.findAll({ where: { BoardId: boardId } });
  res.json(todos);
});

router.post("/", async (req, res) => {
  const todo = req.body;
  await Todos.create(todo);
  res.json(todo);
});

module.exports = router;