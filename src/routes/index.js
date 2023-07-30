const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("BookHub API");
});

router.use("/user", require("./user"));
router.use("/book", require("./book"));
router.use("/chapter", require("./chapter"));

module.exports = router;
