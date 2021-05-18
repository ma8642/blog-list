const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    __id: "5a422aa71b54a676234d17f8",
    title: "a",
    author: "a author",
    url: "a.com",
    likes: 100,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "a",
    author: "a author", // has 2 blogs
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
  {
    _id: "5a422aa71b54a676234d17g1",
    title: "c",
    author: "a author", // has 2 blogs
    url: "c.com",
    likes: 25,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17g2",
    title: "d",
    author: "d author",
    url: "d.com",
    likes: 1000, // tied for most popular blog
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17g3",
    title: "e",
    author: "e author", // has 2 blogs
    url: "e.com",
    likes: 55,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17g4",
    title: "f",
    author: "e author", // has 2 blogs
    url: "f.com",
    likes: 1,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17g3",
    title: "g",
    author: "g author",
    url: "g.com",
    likes: 1000, // tied for most popular blog
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(100);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(2231);
  });
});

describe("favoriteBlog", () => {
  test("of empty list is {}", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });

  test("when list has only one blog equals that", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({ title: "a", author: "a author", likes: 100 });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual({ title: "d", author: "d author", likes: 1000 }); // returns first of most popular blogs
  });
});

describe("mostBlogs", () => {
  test("of empty list is {}", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });

  test("when list has only one blog equals that", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: "a author", blogs: 1 });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual({ author: "a author", blogs: 2 }); // returns first of most popular authors
  });
});
