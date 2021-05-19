const Blog = require("../models/blogList");

const initialBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "a",
    author: "a author",
    url: "a.com",
    likes: 100,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "b",
    author: "b author",
    url: "b.com",
    likes: 50,
    __v: 0,
  },
];

module.exports = {
  initialBlogs,
};
