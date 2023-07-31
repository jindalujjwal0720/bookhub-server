const router = require("express").Router();

const { validateBookAuthor } = require("../middlewares/book");
const { validateToken } = require("../middlewares/user");
const {
  getBook,
  getBooks,
  createBook,
  updateBookById,
  deleteBookById,
} = require("../resolvers/book");

router.get("/:id", getBook);
router.get("/", getBooks);
router.post("/", validateToken, createBook);
router.patch("/:id", validateToken, validateBookAuthor, updateBookById);
router.delete("/:id", validateToken, validateBookAuthor, deleteBookById);

module.exports = router;
