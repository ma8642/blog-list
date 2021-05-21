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

afterAll(() => {
  mongoose.connection.close();
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("unique identifier is called 'id'", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
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

  test("succeeds even when missing 'likes' (will be added with default likes=0)", async () => {
    await api
      .post("/api/blogs")
      .send(helper.newBlogMissingLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const blogLikes = response.body.map((r) => r.likes);
    expect(blogLikes[blogLikes.length - 1]).toBe(0);
  });

  test("does not succeed if missing 'title' or 'url'", async () => {
    await api.post("/api/blogs").send(helper.newBlogMissingTitle).expect(400);
    await api.post("/api/blogs").send(helper.newBlogMissingUrl).expect(400);

    const finalBlogs = await helper.getBlogsInDb();
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a new blog", () => {
  test("succeeds with valid data", async () => {
    const initialBlogs = await helper.getBlogsInDb();
    const blogToDelete = initialBlogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const finalBlogs = await helper.getBlogsInDb();
    expect(finalBlogs).toHaveLength(initialBlogs.length - 1);
    expect(finalBlogs).not.toContain("a.com"); // 'a' blog should no longer be there
  });
});

afterAll(() => {
  mongoose.connection.close();
});
