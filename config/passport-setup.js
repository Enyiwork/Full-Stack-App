const passport = require("passport");
const FbStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const UserModel = require("../models/user-model");


//  gets called when a user logs in( on our POST /process-login)
passport.serializeUser((userFromDb, cb) => {
     //null is for saying "no errors occurred" during the serialize process
     //  |
     cb(null, userFromDb._id);
     //                   /
     // save only the "_id"  of the user
});
//deserialize(how we do retieve the user details form the session)
//-------------------------------------------------------------
//  gets called "every time" you visit thee page on the site while you are logged in
// (that's so we can potentiall personalize all page)
passport.deserializeUser((idFromSession, cb) => {
  // find the user's document by the ID we saved in the session
    UserModel.findById(idFromSession)
    .then((userFromDb) => {
      //null is for saying "no errors occurred" during the serialize process
      //  |
      cb(null, userFromDb);
      //          |
      // send Passport the logged in user's info
    })
    .catch((err) => {
      cb(err);
    });
});

// Log in with facebook

passport.use(
  new FbStrategy(
    // 1st arg of FbStrategy -> settings object
    {
      // facebook CREDENTIALS
      // APP ID
      clientID:     process.env.facebookID,
      // APP secret
      clientSecret: process.env.facebookSecret,

      // URL (where to  go after log in is successful)( one of our routes)
      callbackURL: "/facebook/success",

      // fixes GoogleStrategy
      proxy: true

    },
    // 2nd arg of FbStrategy -> callback
    (accessToken, refreshToken, profile, callback) => {
      // profile contains the user intro we get from facebook
      console.log("FACEBOOK PROFILE-----------------------------");
      console.log(profile);
           // what happens when a user log in facebook
           // (create a new user document OR use an existing)

           //chek if there's already a document in the data  base for this user
           UserModel.findOne({ facebookID: profile.id })
           .then((userFromDb) => {
             // if there's already a user account
             if (userFromDb) {
               // tell Passport to use that user account
               callback(null, userFromDb);
               return;
             }

             //cretae a user account if there is none
             const theUser = new UserModel({
               facebookID: profile.id,
               fullName: profile.displayName

             });

             return theUser.save();
           })
           .then((newUser) => {
             // tell Passport to use the new user account
             callback(null, newUser);

           })
           .catch((err) => {
             //tell Passport there was an error in the login process
             callback(err);
           });
    }
  )// new FbStrategy()
);// passport.use()


// login with Google

//  passport.use(new GoogleStrategy());
passport.use(
  // 1st arg of GoogleStrategy -> settings object
  new GoogleStrategy(
    {
      clientID:     process.env.googleID,
      clientSecret: process.env.googleSecret,

      // URL (where to  go after log in is successful)( one of our routes)
      callbackURL: "/google/success",


      // fixes GoogleStrategy
      proxy: true
    },
    // 2nd arg of GoogleStrategy -> callback
    (accessToken, refreshToken, profile, callback) => {
      // profile contains the user intro we get from Google
      console.log("GOOGLE PROFILE-----------------------------");
      console.log(profile);

      //chek if there's already a document in the data  base for this user
      UserModel.findOne({ GoogleStrategy: profile.id })
      .then((userFromDb) => {
        if(userFromDb) {
          callback(null, userFromDb);

          return;
        }

        //  create a user account if there is none
        const theUser = new UserModel({
          googleID: profile.id,
          // use the email as their name "couse google doesn't give na"
          fullName: profile.emails[0].value
        });
         return theUser.save();
      })
      .then((newUser) => {
        callback(null, newUser);
      })
      .catch((err) => {
        //tell Passport there was an error in the login process
        callback(err);
      });
    }
  )
);
