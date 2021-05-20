const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogList");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  afterAll(() => {
    mongoose.connection.close();
  });
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier is called 'id'", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  await api
    .post("/api/blogs")
    .send(helper.newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogUrls = response.body.map((r) => r.url);
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogUrls).toContain("c.com"); // url of newly added blog
});

test("a blog missing 'likes' will be added with default likes=0", async () => {
  await api
    .post("/api/blogs")
    .send(helper.newBlogMissingLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogLikes = response.body.map((r) => r.likes);
  expect(blogLikes[blogLikes.length - 1]).toBe(0);
});

test("a blog missing 'title' or 'url' can not be added", async () => {
  await api.post("/api/blogs").send(helper.newBlogMissingTitle).expect(400);
  await api.post("/api/blogs").send(helper.newBlogMissingUrl).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
