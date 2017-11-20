// this is going to be the setup to mongoose
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/express-user", {useMongoClient: true})
.then(() => {
  console.log("Mongoose is connected🤩🤪🤩");
})
.catch((err) => {
  console.log("Mongoose conecction FAILED!!!🧐🧐🧐");
  console.log(err);
});
