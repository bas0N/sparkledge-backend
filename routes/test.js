const express = require("express");

const router = express.Router();
const path = require("path");
router.get("/", (req, res) => {
  res.send("Hello test 1");
});
router.get("/newpage", (req, res) => {
  res.send("hello test new page");
});

module.exports = router;
