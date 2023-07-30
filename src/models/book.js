const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
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
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: 1000,
    },
    genre: {
      type: String,
      required: false,
      trim: true,
      maxlength: 100,
    },
    coverImageUrl: {
      type: String,
      required: false,
      trim: true,
    },
    tags: [
      {
        type: String,
        required: false,
        trim: true,
        maxlength: 100,
      },
    ],
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    visibility: {
      type: String,
      required: true,
      trim: true,
      default: "private",
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    publishedAt: {
      type: Date,
      required: false,
    },
    language: {
      type: String,
      required: true,
      trim: true,
      default: "english",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
