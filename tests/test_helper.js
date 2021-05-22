const Blog = require("../models/blogList");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "a",
    author: "a author",
    url: "a.com",
    likes: 100,
  },
  {
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

const initialUsers = [
  {
    username: "woozyloser7",
    name: "Hoosier Woolsie",
    password: "123abc?!",
  },
  {
    username: "aberzombie",
    name: "Abernathy Cole",
    password: "321@rganoile",
  },
];

const newUser = {
  username: "ufol0ver",
  name: "Mia Cuturo",
  password: "&alienzLUVmia",
};

const getUsersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  newBlog,
  newBlogMissingLikes,
  getBlogsInDb,
  initialUsers,
  newUser,
  getUsersInDb,
};
