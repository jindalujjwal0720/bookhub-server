const router = require("express").Router();

const { signup, login, getUser } = require("../resolvers/user");

router.get("/:id", getUser);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
