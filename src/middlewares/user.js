const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/user");

/**
 * Middleware to validate if the user is logged in.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const accessToken = token.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await getUserById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = {
  validateToken,
};
