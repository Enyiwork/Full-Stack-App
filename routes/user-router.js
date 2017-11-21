const express = require("express");

const bcrypt = require("bcrypt");

const passport = require("passport");

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

   res.render("index");
});

router.post("/process-signup", (req, res, next) => {
   if (req.body.signupFirstName === "" ||
       req.body.signupLastName  === "" ||
       req.body.signupEmail     === "" ||
       req.body.signupPassword  === ""
      ){
        res.locals.errorMessage = "Need To Fill In All The Blanks";
        res.render("index");

        // early return to prevent the rest of the code from running
        // prevent the reset of the code running
        return;
      } else if (req.body.signupPassword.length < 6) {

        res.locals.errorMessage = "You need a password with at least 6 characters";
        res.render("index");

        return;
      }


// query the database to see if the email is taken
    UserModel.findOne({ email: req.body.signupEmail })
    .then((userFromDb) => {
      // userFromDb will be null if the email is not taken

      // display the form if the email is taken
      if (userFromDb !== null){
        res.locals.errorMessage = "This Email is already taken";
        res.render("index");

        // early return to prevent the rest of the code from running
        // prevent the reset of the code running
        return;
      }
  });
    // generate a new salt for this user's password
        const salt = bcrypt.genSaltSync(10);

        // encrypt the password submitted by the user from the form
        //                                              |
        const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

        const theUser = new UserModel({

          email:    req.body.signupEmail,
          password: scrambledPassword
        });

        theUser.save()
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          next(err);
    });
});

// STEP # 1 show loging in the form
router.get("/login", (req, res, next) => {

  res.render("user-views/login-page");
});


// STEP # 2 process the  log in form
router.post("/process-login", (req, res, next) => {
  // find a user document in the database with that email
   UserModel.findOne({ email: req.body.loginEmail })
      .then((userFromDb) => {
        // if we didn't find a user
          if (userFromDb === null ) {
            // display the form again because the email is worng
            res.locals.errorMessage = "Email is Incorrect";
            res.render("index");

            // early return to stop the function since there an error
            // prevent the reset of the code running
            return;
          }

          // is email is correct now we check the password
       const isPasswordGood =
          bcrypt.compareSync(req.body.loginPassword, userFromDb.password);

          if (isPasswordGood === false){
            res.locals.errorMessage = "Password Incorrect";
            res.render("index");

            // early return to stop the function since there an error
            // prevent the reset of the code running
            return;
          }

          // CREDENTIALS ARE GOOD! We need log the user IN

          //passport defines the "req.login()"
          // for us to specify when to log in a user intro the session
          req.login(userFromDb, (err) => {
            // check to see if the log in worked
            if (err) {
              // if it didn't show the error page
              next(err);
            } else {

              // redirect to home page on successful log in
              res.redirect("/login");

            }
         }); // req.login()
      })// then()
      .catch((err) => {
        next(err);
      });
});

// LOG OUT session
router.get("/logout", (req, res, next) => {
     // Passport defines the "req.logout" method
     // for  us to specify when to log out a user ( clear then from the session)
     req.logout();

     res.redirect("/");
});

// Link to "/FAcebook/login" to initiate the login proccess
router.get("/facebook/login", passport.authenticate("facebook"));


// Facebook will redirect here after log in is successful
router.get("/facebook/success",
passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/login"

}
));

// Google Log in  ROUTES
//---------------------------------

//link to "/google/login" to initiate the login proccess
router.get("/google/login",
    passport.authenticate("google", {
       scope: [
         "https://www.googleapis.com/auth/plus.login",
         "https://www.googleapis.com/auth/plus.profile.emails.read"
      ]
   })
);

// Google will redirect here after login is successful
router.get("/google/success",    // no normal callback here)
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);


module.exports = router;
