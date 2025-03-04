import express from "express";
import books from "../data/books.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(books);
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= books.length) {
    return res.status(404).json({ message: "book not found" });
  }
  res.status(200).json(books[id]);
});
router.post("/", (req, res) => {
  const { author, title, year } = req.body;
  if (!author || !title || !year) {
    return res.status(400).json({ message: "missing data" });
  }
  const newbook = { author, title, year };
  books.push(newbook);
  res.status(201).json(newbook);
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= books.length) {
    return res.status(404).json({ message: "book not found" });
  }
  const { author, title, year } = req.body;
  if (!author || !title || !year) {
    return res.status(400).json({ message: "missing data" });
  }
  books[id] = { author, title, year };
  res.status(200).json(books[id]);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= books.length) {
    return res.status(404).json({ message: "book not found" });
  }
  books.splice(id, 1);
  res.status(200).json({ message: "deleted" });
});

export default router;
