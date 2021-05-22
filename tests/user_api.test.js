const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({}); // clear db first
  let userObject = new User(helper.initialUsers[0]);
  await userObject.save();
  userObject = new User(helper.initialUsers[1]);
  await userObject.save();
});

afterAll(() => {
  mongoose.connection.close();
});

describe("when there is initially some users saved", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 7000);

  test("there are two users", async () => {
    const result = await api.get("/api/users");
    expect(result.body).toHaveLength(helper.initialUsers.length);
  });
});

describe("addition of a new user", () => {
  test("succeeds with valid data", async () => {
    await api
      .post("/api/users")
      .send(helper.newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/users");
    const usersList = response.body.map((o) => o.username);
    expect(usersList).toHaveLength(helper.initialUsers.length + 1);
    expect(usersList).toContain("ufol0ver");
  });

  test("fails with bad data", async () => {
    await api.post("/api/users").send(helper.newUserShortPassword).expect(400);
    await api.post("/api/users").send(helper.newUserShortUsername).expect(400);

    const usersList = await helper.getUsersInDb();
    expect(usersList).toHaveLength(helper.initialUsers.length);
  }, 6000);
});
