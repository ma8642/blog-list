const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const mongoUrl = process.env.MONGODB_URI;
console.log("connecting to", mongoUrl);

const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});
blogSchema.plugin(uniqueValidator);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
