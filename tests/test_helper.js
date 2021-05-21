const Blog = require("../models/blogList");

const initialBlogs = [
  {
    id: "5a422aa71b54a676234d17f8",
    title: "a",
    author: "a author",
    url: "a.com",
    likes: 100,
  },
  {
    id: "5a422aa71b54a676234d17f9",
    title: "b",
    author: "b author",
    url: "b.com",
    likes: 50,
  },
];

const newBlog = { title: "c", author: "c author", url: "c.com", likes: 2000 };
const newBlogMissingLikes = {
  title: "d",
  author: "d author",
  url: "d.com",
  likes: undefined,
};
const newBlogMissingTitle = {
  title: undefined,
  author: "e author",
  url: "e.com",
  likes: 2000,
};
const newBlogMissingUrl = {
  title: "f",
  author: "f author",
  url: undefined,
  likes: 2000,
};

const getBlogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  newBlog,
  newBlogMissingLikes,
  getBlogsInDb,
};
