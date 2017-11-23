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

    email: {
      type: String
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


const RoomModel = mongoose.model("Room", roomSchema);


module.exports = RoomModel;
