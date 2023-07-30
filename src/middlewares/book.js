/**
 * Validate if the user is the author of the book
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
const validateBookAuthor = (req, res, next) => {
  const { user } = req;
  const { book } = req.body;
  if (user._id.toString() !== book.author.toString()) {
    return res.status(403).send("Forbidden.");
  }
  next();
};

module.exports = {
  validateBookAuthor,
};
