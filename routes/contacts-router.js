const express = require("express");

const ContactModel = require("../models/contacts-model");

const router = express.Router();

router.get("/contacts/new", (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");

    return;
  }

  res.render("user-views/form-contacts");
});

router.post("/contact", (req, res, next) => {
  // redirect to log in if there is no logged in users
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
      const theContact = new ContactModel({
        initial:   req.body.initial,
        firstname: req.body.firstN,
        lastname:  req.body.lastN,
        phone:     req.body.phoneN,
        email:     req.body.emailN,
        // "req.user" is the logged in user's document (defined by Passport)
        owner:     req.user._id
      });

      theContact.save()
      .then(() => {
        res.redirect("/my-list-contacts");
      })
      .catch((err) => {
        next(err);
      });
});


router.get("/my-list-contacts", (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
  ContactModel
  // retrive all room owned by the logged in user
  .find({ owner: req.user._id })
  .sort({ createAt: -1 })
  .exec()
  .then((contactsResults) => {

     res.locals.listOfContacts = contactsResults;
     res.render("user-views/list-of-contacts");

  })
  .catch((err) => {
    next(err);
  });

});

module.exports = router;
