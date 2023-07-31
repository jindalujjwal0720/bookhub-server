const User = require("../models/user");

/**
 * returns the user with the given id
 * @param {String} id
 * @returns
 */
const getUserById = async (id) => {
  if (!id) return null;
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return null;
  }
};

/**
 * returns the user with the given email
 * @param {String} email
 * @returns
 */
const getUserByEmail = async (email) => {
  if (!email) return null;
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    return null;
  }
};

/**
 * returns null if the user data is valid, otherwise returns the error string
 * @param {Object} userData
 * @returns {String | null}
 */
const validateNewUserRequiredFields = (userData) => {
  const { name, email, password } = userData;
  if (!name) return "Name is required";
  else if (!email) return "Email is required";
  else if (!password) return "Password is required";
  else if (name.length < 3) return "Name should be at least 3 characters long";
  else if (password.length < 8)
    return "Password should be at least 8 characters long";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(regex)) return "Email is invalid";
  return null;
};

/**
 * creates a new user and returns it
 * @param {Object} userData
 * @returns
 */
const createNewUser = async (userData) => {
  if (!userData) return null;
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    return null;
  }
};

/**
 * updates the user and returns it
 * @param {String} userId
 * @param {Object} userData
 * @returns
 */
const updateUser = async (userId, userData) => {
  if (!userId || !userData) return null;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    return null;
  }
};

/**
 * deletes the user and returns it
 * @param {String} userId
 * @returns
 */
const deleteUser = async (userId) => {
  if (!userId) return null;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getUserById,
  getUserByEmail,
  validateNewUserRequiredFields,
  createNewUser,
  updateUser,
  deleteUser,
};
