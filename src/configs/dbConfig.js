const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const uri = process.env.MONGO_URI;
module.exports = mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Mongo DB connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error connecting database");
  });
