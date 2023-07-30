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
  const bookFromDb = await getBookById(bookId);
  if (!bookFromDb) {
    return res.status(404).send("Book not found.");
  }
  if (user._id.toString() !== bookFromDb.author.toString()) {
    return res.status(403).send("Forbidden.");
  }
  req.book = bookFromDb;
  next();
};

module.exports = {
  validateBookForChapter,
};
