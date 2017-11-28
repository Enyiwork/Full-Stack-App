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
        address:   req.body.addressN,

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



// STEP #1: show edit form
router.get("/my-list-contacts/:prodId/edit", (req, res, next) => {
    // retrieve the document from the database
    ContactModel.findById(req.params.prodId)
      .then((productFromDb) => {
          // create a local variable for the view to access the DB result
          // (this is so we can pre-fill the form)
          res.locals.productDetails = productFromDb;

          res.render("user-views/contact-edit");
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
});
// STEP #2: receive edit submission
router.post("/my-list-contacts/:prodId", (req, res, next) => {
    // retrieve the document from the database
    ContactModel.findById(req.params.prodId)
      .then((productFromDb) => {
          // update the document
          productFromDb.set({
            firstname: req.body.firstN,
            lastname:  req.body.lastN,
            phone:     req.body.phoneN,
            email:     req.body.emailN,
            address:   req.body.addressN,
          }); // |                        |
              // fields from         names of the
              // model's schema      input tags

            //set up the "productDetails" locals variable
            //we get validation error and we need to display to the form again
            res.locals.productDetails = productFromDb;

          // and then save the updates
          // (return the promise of the next database operation)
          return productFromDb.save();
      })
      .then(() => {
          // STEP #3: redirect after a SUCCESSFUL save
          // redirect to the product details page
          res.redirect(`/my-list-contacts`);
            // you CAN'T redirect to an EJS file
            // you can ONLY redirect to a URL
      })
      .catch((err) => {
        // is this a validation error?
        // if it's display the form with the error messaje
        if (err.errors){
          res.locals.validationErrors = err.errors;
          res.render("user-views/contacts-edit");
        }
      // if it isn't then render the error page  with the error
        else{
          // render the error page with our error
          next(err);
        }
      });
});

module.exports = router;
