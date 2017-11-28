const express = require("express");

const UserList = require("../models/list-model");



const router = express.Router();

router.post("/list-goals", (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/publicChat");
    return;
  }
  const theList = new UserList({
    listGoals:   req.body.listG,

    // "req.user" is the logged in user's document (defined by Passport)
    owner:     req.user._id
  });

  theList.save()
  .then(() => {
    res.redirect("/publicChat");
  })
  .catch((err) => {
    next(err);
  });
});

router.get("/list-goals", (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/publicChat");
    return;
  }
  UserList
  // retrive all room owned by the logged in user
  .find({ owner: req.user._id })
  .sort({ createAt: -1 })
  .exec()
  .then((goalsResults) => {

     res.locals.listOfGoals = goalsResults;
     res.render("user-views/list-goals");

  })

  .catch((err) => {
    next(err);
  });

});

module.exports = router;
