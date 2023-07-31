/**
 * Validate if the user is the author of the book
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
const validateBookAuthor = (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const book = user.books.find((book) => book.toString() === id);
  if (!book) {
    return res.status(403).send("Forbidden.");
  }
  next();
};

module.exports = {
  validateBookAuthor,
};
