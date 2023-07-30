const Book = require("../models/book");

/**
 * returns the book with the given id
 * @param {String} id
 * @returns
 */
const getBookById = async (id) => {
  const book = await Book.findById(id);
  return book;
};

/**
 * returns the books with the given author id; paginated with the given page and limit
 * @param {String} authorId
 * @param {Int} page
 * @param {Int} limit
 * @returns
 */
const getBooksByAuthorId = async (authorId, page = 1, limit = 10) => {
  const books = await Book.find({ author: authorId })
    .skip((page - 1) * limit)
    .limit(limit);
  return books;
};

/**
 * returns the books with the given genre; paginated with the given page and limit
 * @param {String} genre
 * @param {Int} page
 * @param {Int} limit
 * @returns
 */
const getBooksByGenre = async (genre, page = 1, limit = 10) => {
  const books = await Book.find({ genre: genre })
    .skip((page - 1) * limit)
    .limit(limit);
  return books;
};

/**
 * returns the books with the given tags; paginated with the given page and limit
 * @param {Array} tags
 * @param {Int} page
 * @param {Int} limit
 * @returns
 */
const getBooksByTags = async (tags, page = 1, limit = 10) => {
  const books = await Book.find({ tags: { $in: tags } })
    .skip((page - 1) * limit)
    .limit(limit);
  return books;
};

/**
 * returns null if the book data is valid, otherwise returns the error string
 * @param {Object} bookData
 * @returns {String | null}
 */
const validateBookRequiredFields = (bookData) => {
  const { title } = bookData;
  if (!title) return "Title is required";
  return null;
};

/**
 * creates a new book and returns it
 * @param {Object} bookData
 * @returns
 */
const createNewBook = async (bookData) => {
  const newBook = await Book.create(bookData);
  return newBook;
};

/**
 * updates the book and returns it
 * @param {String} bookId
 * @param {Object} bookData
 * @returns
 */
const updateBook = async (bookId, bookData) => {
  const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, {
    new: true,
  });
  return updatedBook;
};

/**
 * deletes the book and returns it
 * @param {String} bookId
 * @returns
 */
const deleteBook = async (bookId) => {
  const deletedBook = await Book.findByIdAndDelete(bookId);
  return deletedBook;
};

module.exports = {
  getBookById,
  getBooksByAuthorId,
  getBooksByGenre,
  getBooksByTags,
  validateBookRequiredFields,
  createNewBook,
  updateBook,
  deleteBook,
};
