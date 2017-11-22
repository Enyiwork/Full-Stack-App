const express = require("express");


const router = express.Router();

router.get("/myProfile", (req, res, next) => {
  if (req.user === undefined){
      res.redirect("/setting");

      return;
  }
  res.render("preferences-views/setting-page.ejs");
});

module.exports = router;
