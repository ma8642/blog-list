const blogsRouter = require("express").Router();
const Blog = require("../models/blogList");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const usersList = await User.find({});
  const randomUser = usersList[Math.floor(Math.random() * usersList.length)];

  if (!body.title || !body.url) {
    response.status(400).end();
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: randomUser._id,
  });
  const savedBlog = await blog.save();
  randomUser.blogs = randomUser.blogs.concat(savedBlog._id);
  await randomUser.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const result = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, {
    new: true,
  });
  response.status(200).json(result);
});

module.exports = blogsRouter;
