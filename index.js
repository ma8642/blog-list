require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(express.json());
morgan.token("body", function (req, res) {
  // display data for POST request
  if (Object.keys(res["req"]["body"]).length > 0) {
    return JSON.stringify(res["req"]["body"]);
  }
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const Blog = require("./models/blogList");

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
