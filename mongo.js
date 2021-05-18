const mongoose = require("mongoose");

let addToDB = true;

if (process.argv.length > 3 && process.argv.length < 7) {
  console.log(
    "Please provide password, blog title, author, url, and likes as arguments: node mongo.js <password> <title> <author> <url> <likes>"
  );
  process.exit(1);
} else if (process.argv.length === 3) {
  addToDB = false;
}

const password = process.argv[2];
let [title, author, url] = ["", "", "", ""];
if (addToDB) {
  title = process.argv[3];
  author = process.argv[4];
  url = process.argv[5];
  likes = process.argv[6];
}

const mongoUrl = `mongodb+srv://marley_fo21:${password}@cluster0.gnddm.mongodb.net/person-app?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

if (addToDB) {
  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  blog.save().then((result) => {
    console.log(`added ${blog} to bloglist!`);
    mongoose.connection.close();
  });
} else {
  Blog.find({}).then((result) => {
    console.log("bloglist:");
    result.forEach((blog) => {
      console.log(`${blog.title} - ${blog.author} (${blog.likes})`);
    });
    mongoose.connection.close();
  });
}
