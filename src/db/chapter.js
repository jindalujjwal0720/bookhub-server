const Chapter = require("../models/chapter");

/**
 * returns the chapter with the given id
 * @param {string} id
 * @returns
 */
const getChapterById = async (id) => {
  const chapter = await Chapter.findById(id)
    .populate("book", "title author")
    .select("+content");
  return chapter;
};

/**
 * returns the chapters with the given book id without the content
 * @param {String} bookId
 * @returns
 */
const getChaptersByBookId = async (bookId) => {
  const chapters = await Chapter.find({ book: bookId })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-content");
  return chapters;
};

/**
 * returns null if the chapter data is valid, otherwise returns the error string
 * @param {Object} chapterData
 * @returns
 */
const validateChapterRequiredFields = (chapterData) => {
  if (!chapterData.title) return "Title is required";
  return null;
};

/**
 * creates a new chapter with the given data
 * @param {Object} chapterData
 * @returns
 */
const createNewChapter = async (chapterData) => {
  const chapter = await Chapter.create(chapterData);
  return chapter;
};

/**
 * updates the chapter with the given id with the given data
 * @param {String} chapterId
 * @param {Object} chapterData
 * @returns
 */
const updateChapter = async (chapterId, chapterData) => {
  const updatedChapter = await Chapter.findByIdAndUpdate(
    chapterId,
    chapterData,
    {
      new: true,
    }
  );
  return updatedChapter;
};

/**
 * deletes the chapter with the given id
 * @param {String} chapterId
 * @returns
 */
const deleteChapter = async (chapterId) => {
  const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
  return deletedChapter;
};

module.exports = {
  getChapterById,
  getChaptersByBookId,
  validateChapterRequiredFields,
  createNewChapter,
  updateChapter,
  deleteChapter,
};
