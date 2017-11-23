const express = require("express");

const router = express.Router();

router.get("/publicChat", (req, res, next) => {
  res.render("user-views/chat-setup");
});

router.get("/public", (req, res, next) => {
  res.render("preferences-views/setting-page.ejs");
});



module.exports = router;
