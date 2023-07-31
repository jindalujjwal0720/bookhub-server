const {
  createNewChapter,
  updateChapter,
  validateChapterRequiredFields,
  deleteChapter,
  getChapterById,
} = require("../db/chapter");

/**
 * returns the chapter with the given id
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const getChapter = async (req, res) => {
  const { id } = req.params;
  const chapter = await getChapterById(id);
  if (!chapter) {
    return res.status(404).send("Chapter not found.");
  }
  res.json(chapter);
};

/**
 * returns the chapters of the book with the given book id
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const createChapter = async (req, res) => {
  const { chapter } = req.body;
  const { book } = req;
  const requiredFieldsError = validateChapterRequiredFields(chapter);
  if (requiredFieldsError) {
    return res.status(400).send(requiredFieldsError);
  }
  const newChapter = await createNewChapter(chapter);
  book.chapters.push(newChapter._id);
  book.save();
  newChapter.book = book._id;
  newChapter.save();
  res.status(201).json(newChapter);
};

/**
 * updates the chapter with the given id
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const updateChapterById = async (req, res) => {
  const { id } = req.params;
  const { chapter } = req.body;
  const updatedChapter = await updateChapter(id, chapter);
  if (!updatedChapter) {
    return res.status(404).send("Chapter not found.");
  } else if (typeof updatedChapter === "string") {
    return res.status(400).send(updatedChapter);
  }
  res.json(updatedChapter);
};

/**
 * deletes the chapter with the given id
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const deleteChapterById = async (req, res) => {
  const { id } = req.params;
  const { book } = req;
  book.chapters.pull(id);
  await book.save();
  const chapter = await deleteChapter(id);
  res.json(chapter);
};

module.exports = {
  getChapter,
  createChapter,
  updateChapterById,
  deleteChapterById,
};
