const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  subtitle: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100,
  },
  content: {
    type: String,
    trim: true,
    select: false,
  },
  chapterNumber: {
    type: Number,
    required: false,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
});

module.exports = mongoose.model("Chapter", chapterSchema);
