const express = require("express");

const bcrypt = require("bcrypt");

const UserModel = require("../models/user-model");

const router = express.Router();

// STEP #1) show the sign up form
router.get("/signup", (req, res, next) => {
   if (req.user) {
     res.redirect("/");

     // early return to prevent the rest of the code from running
     // prevent the reset of the code running
     return;
  }

   res.render("user-views/signup-page");
});

router.post("/process-signup", (req, res, next) => {
   if (req.body.signupFirstName === "" ||
       req.body.signupLastName  === "" ||
       req.body.signupEmail     === "" ||
       req.body.signupPassword  === ""
      ){
        res.locals.errorMessage = "Need To Fill In All The Blanks";
        res.render("user-views/signup-page");

        // early return to prevent the rest of the code from running
        // prevent the reset of the code running
        return;
      } else if (req.body.signupPassword.length < 6) {

        res.locals.errorMessage = "You need a password with at least 6 characters";
        res.render("user-views/signup-page");

        return;
      }
});

// query the database to see if the email is taken
    UserModel.findOne({ email: req.body.signupEmail })
    .then((userFromDb) => {
      // userFromDb will be null if the email is not taken

      // display the form if the email is taken
      if (userFromDb !== null){
        res.locals.errorMessage = "This Email is already taken";
        res.render("user-views/signup-page");

        // early return to prevent the rest of the code from running
        // prevent the reset of the code running
        return;
      }
    });


module.exports = router;
