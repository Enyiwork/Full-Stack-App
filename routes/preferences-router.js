const express = require("express");

const UserModel = require("../models/user-model");

const router = express.Router();

router.get("/profile", (req, res, next) => {
  if (req.user === undefined){
      res.redirect("/publicChat");

      return;
  }
  res.render("user-views/login-page.ejs");
});


router.get("/list", (req, res, next) => {
  if (req.user === undefined){
      res.redirect("/publicChat");

      return;
  }
  res.render("user-views/list-goals.ejs");
});

router.get("/contacts", (req, res, next) => {
  if (req.user === undefined){
      res.redirect("/publicChat");

      return;
  }
  res.render("user-views/contacts.ejs");
});




module.exports = router;
