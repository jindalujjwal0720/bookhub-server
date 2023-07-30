const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  penName: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100,
  },
  profileImageUrl: {
    type: String,
    required: false,
    trim: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
