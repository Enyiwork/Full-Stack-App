// this is going to be the setup to mongoose
const mongoose = require("mongoose");


mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true})
.then(() => {
  console.log("Mongoose is connected🤩🤪🤩");
})
.catch((err) => {
  console.log("Mongoose conecction FAILED!!!🧐🧐🧐");
  console.log(err);
});
