const router = require("express").Router();

const { validateBookForChapter } = require("../middlewares/chapter");
const { validateToken } = require("../middlewares/user");
const {
  getChapter,
  createChapter,
  updateChapterById,
  deleteChapterById,
} = require("../resolvers/chapter");

router.get("/:id", getChapter);
router.post("/", validateToken, validateBookForChapter, createChapter);
router.put("/:id", validateToken, validateBookForChapter, updateChapterById);
router.delete("/:id", validateToken, validateBookForChapter, deleteChapterById);

module.exports = router;
