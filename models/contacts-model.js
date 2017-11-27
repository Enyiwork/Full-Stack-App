const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema (
  // 1st argument -> SCHEMA STRUCTURE
  {

    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },

    owner:
       { type: Schema.Types.ObjectId,
         required: true
         }
  },
  // 2nd argument -> SETTINGS Object
  {
    // automatically
    timestamps: true
  }
);


const ContactModel = mongoose.model("Contact", roomSchema);


module.exports = ContactModel;
