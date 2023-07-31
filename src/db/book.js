const Book = require("../models/book");

/**
 * returns the book with the given id
 * @param {String} id
 * @returns
 */
const getBookById = async (id) => {
  if (!id) return null;
  try {
    const book = await Book.findById(id)
      .populate("author")
      .populate("chapters", "title chapterNumber");
    return book;
  } catch (error) {
    return null;
  }
};

/**
 * returns the books with the given author id; paginated with the given page and limit
 * @param {String} authorId
 * @param {Int} page
 * @param {Int} limit
 * @returns
 */
const getBooksByAuthorId = async (authorId, page = 1, limit = 10) => {
  if (!authorId) return null;
  try {
    const books = await Book.find({ author: authorId })
      .skip((page - 1) * limit)
      .limit(limit);
    return books;
  } catch (error) {
    return null;
  }
};

/**
 * returns the books with the given genre; paginated with the given page and limit
 * @param {String} genre
 * @param {Int} page
 * @param {Int} limit
 * @returns
 */
const getBooksByGenre = async (genre, page = 1, limit = 10) => {
  if (!genre) return null;
  try {
    const books = await Book.find({ genre: genre })
      .skip((page - 1) * limit)
      .limit(limit);
    return books;
  } catch (error) {
    return null;
  }
};

/**
 * returns the books with the given tags; paginated with the given page and limit
 * @param {Array} tags
 * @param {Int} page
 * @param {Int} limit
 * @returns
 */
const getBooksByTags = async (tags, page = 1, limit = 10) => {
  if (!tags) return null;
  try {
    const books = await Book.find({ tags: { $in: tags } })
      .skip((page - 1) * limit)
      .limit(limit);
    return books;
  } catch (error) {
    return null;
  }
};

/**
 * returns all the books; paginated with the given page and limit
 * @param {Int} page
 * @param {Int} limit
 * @returns
 */
const getAllBooks = async (page = 1, limit = 10) => {
  try {
    const books = await Book.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    return books;
  } catch (error) {
    return null;
  }
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
  if (!bookData) return null;
  try {
    const newBook = await Book.create(bookData);
    return newBook;
  } catch (error) {
    return null;
  }
};

/**
 * updates the book with the provided data and returns it
 * @param {String} bookId
 * @param {Object} bookData
 * @returns
 */
const updateBook = async (bookId, bookData) => {
  if (!bookId || !bookData) return null;
  try {
    const updatedBook = await Book.findById(bookId);
    if (!updatedBook) return null;
    const { author, ...rest } = bookData;
    for (let key in rest) {
      updatedBook[key] = rest[key];
    }
    const requiredFieldsError = validateBookRequiredFields(updatedBook);
    if (requiredFieldsError) return requiredFieldsError;
    await updatedBook.save();
    return updatedBook;
  } catch (error) {
    return null;
  }
};

/**
 * deletes the book and returns it
 * @param {String} bookId
 * @returns
 */
const deleteBook = async (bookId) => {
  if (!bookId) return null;
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    return deletedBook;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getBookById,
  getBooksByAuthorId,
  getBooksByGenre,
  getBooksByTags,
  getAllBooks,
  validateBookRequiredFields,
  createNewBook,
  updateBook,
  deleteBook,
};
