const Chapter = require("../models/chapter");

/**
 * returns the chapter with the given id
 * @param {string} chapterId
 * @returns
 */
const getChapterById = async (chapterId) => {
  if (!chapterId) return null;
  try {
    const chapter = await Chapter.findById(chapterId).select("+content");
    return chapter;
  } catch (error) {
    return null;
  }
};

/**
 * returns the chapters with the given book id without the content
 * @param {String} bookId
 * @returns
 */
const getChaptersByBookId = async (bookId) => {
  if (!bookId) return null;
  try {
    const chapters = await Chapter.find({ book: bookId })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-content");
    return chapters;
  } catch (error) {
    return null;
  }
};

/**
 * returns null if the chapter data is valid, otherwise returns the error string
 * @param {Object} chapterData
 * @returns
 */
const validateChapterRequiredFields = (chapterData) => {
  const { title } = chapterData;
  if (!title) return "Title is required";
  return null;
};

/**
 * creates a new chapter with the given data
 * @param {Object} chapterData
 * @returns
 */
const createNewChapter = async (chapterData) => {
  if (!chapterData) return null;
  try {
    const chapter = await Chapter.create(chapterData);
    return chapter;
  } catch (error) {
    return null;
  }
};

/**
 * updates the chapter with the given id with the given data
 * @param {String} chapterId
 * @param {Object} chapterData
 * @returns
 */
const updateChapter = async (chapterId, chapterData) => {
  if (!chapterId || !chapterData) return null;
  try {
    const updatedChapter = await Chapter.findById(chapterId);
    if (!updatedChapter) return null;
    const { book, ...rest } = chapterData;
    for (let key in rest) {
      updatedChapter[key] = rest[key];
    }
    const requiredFieldsError = validateChapterRequiredFields(updatedChapter);
    if (requiredFieldsError) return requiredFieldsError;
    await updatedChapter.save();
    return updatedChapter;
  } catch (error) {
    return null;
  }
};

/**
 * deletes the chapter with the given id
 * @param {String} chapterId
 * @returns
 */
const deleteChapter = async (chapterId) => {
  if (!chapterId) return null;
  try {
    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
    return deletedChapter;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getChapterById,
  getChaptersByBookId,
  validateChapterRequiredFields,
  createNewChapter,
  updateChapter,
  deleteChapter,
};
