const mongoose = require("mongoose");

const Schema = mongoose.Schema;


// new Schema({ schema },{ setting })

const userSchema = new Schema(
  // 1st argument -> SCHEMA STRUCTURE
   {
     firstName: {
       type: String,
       
     },

     lastName: {
       type: String,
       
     },

     email: {
       type: String,
       match: [/.+@.+/, 'Email Need an "@" sign']
     },

     password: {
       type: String
     },

     facebookID: {
       type: String
     },

     googleID: {
       type: String
     },

     role: {
       type: String,
       // role can only be "normal" or "admin"
       enum: ["normal", "admin"],
       default: "normal"
     }
   },

   // 2nd argument -> SETTING object
   {
     // automatially add " createAt" and "updateAt" Date fields
     timestamps: true
   }
 );

 const UserModel = mongoose.model("User", userSchema);

 module.exports = UserModel;
