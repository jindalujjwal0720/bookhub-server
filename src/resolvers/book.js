const {
  createNewBook,
  validateBookRequiredFields,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByAuthorId,
  getBooksByGenre,
  getBooksByTags,
  getAllBooks,
} = require("../db/book");

/**
 * returns the book with the given id
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const getBook = async (req, res) => {
  const { id } = req.params;
  const book = await getBookById(id);
  if (!book) {
    return res.status(404).send("Book not found.");
  }
  res.json(book);
};

/**
 * returns the books with the given query params
 * @param {Object} req
 * @param {Object} res
 * @returns
 * @example
 * // returns the books of the author with the given id
 * GET /books?authorId=123
 * // returns the books with the given genre
 * GET /books?genre=fantasy
 * // returns the books with the given tags
 * GET /books?tags=fantasy,adventure
 * // return all the books
 * GET /books
 */
const getBooks = async (req, res) => {
  if (typeof req.query.tags === "string")
    req.query.tags = req.query.tags.split(",");
  const { authorId, genre, tags, page, limit } = req.query;
  let books;
  if (authorId) books = await getBooksByAuthorId(authorId, page, limit);
  else if (genre) books = await getBooksByGenre(genre, page, limit);
  else if (tags) books = await getBooksByTags(tags, page, limit);
  else books = await getAllBooks(page, limit);
  return res.json({
    books,
    authorId,
    genre,
    tags,
    page,
    count: books.length,
  });
};

/**
 * creates a new book with the given data
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const createBook = async (req, res) => {
  const { book } = req.body;
  const { user } = req;
  const requiredFieldsError = validateBookRequiredFields(book);
  if (requiredFieldsError) {
    return res.status(400).send(requiredFieldsError);
  }
  const newBook = await createNewBook(book);
  user.books.push(newBook._id);
  await user.save();
  newBook.author = user._id;
  await newBook.save();
  res.status(201).json(newBook);
};

/**
 * updates the book with the given id
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const updateBookById = async (req, res) => {
  const { id } = req.params;
  const { book } = req.body;
  const updatedBook = await updateBook(id, book);
  // either the book was not found or there was an error
  if (!updatedBook) {
    return res.status(404).send("Book not found.");
  } else if (typeof updatedBook === "string") {
    return res.status(400).send(updatedBook);
  }
  res.json(updatedBook);
};

/**
 * deletes the book with the given id
 * @param {Object} req
 * @param {Object} res
 */
const deleteBookById = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  user.books.pull(id);
  await user.save();
  const book = await deleteBook(id);
  res.json(book);
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBookById,
  deleteBookById,
};
