const blogsRouter = require("express").Router();
const Blog = require("../models/blogList");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url) {
    response.status(400).end();
  }
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
