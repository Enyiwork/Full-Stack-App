const express = require("express");

const router = express.Router();

router.get("/publicChat", (req, res, next) => {
  res.render("user-views/chat-setup");
});

module.exports = router;
