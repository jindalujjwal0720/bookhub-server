const { getBookById } = require("../db/book");

/**
 * validates if the book exists and if the user is the author of the book
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
const validateBookForChapter = async (req, res, next) => {
  const { user } = req;
  const { bookId } = req.body;
  const book = await getBookById(bookId);
  if (!book) {
    return res.status(404).send("Book not found.");
  }
  const isAuthor = user.books.find((book) => book.toString() === bookId);
  if (!isAuthor) {
    return res.status(403).send("Forbidden.");
  }
  req.book = book;
  next();
};

module.exports = {
  validateBookForChapter,
};
