const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createNewUser, getUserById } = require("../db/user");

/**
 * signs up a new user and returns the token and user
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const signup = async (req, res) => {
  const { user } = req.body;
  const { email, password } = user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  const oldUser = getUserByEmail(email);
  if (oldUser) {
    return res.status(409).send("User already exists. Please login.");
  }
  const requiredFieldsError = validateNewUserRequiredFields(user);
  if (requiredFieldsError) {
    return res.status(400).send(requiredFieldsError);
  }
  const newUser = await createNewUser(user);
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({ accessToken: token, user: newUser });
};

/**
 * logs in a user and returns the token and user
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(404).send("User not found. Please signup.");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid password.");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({ accessToken: token, user });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    return res.status(404).send("User not found.");
  }
  res.json(user);
};

module.exports = { signup, login, getUser };
