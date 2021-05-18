var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    total += blog.likes;
    return total;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let favoriteBlog = {};
  let maxLikes = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      favoriteBlog = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes,
      };
    }
  }
  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return { author: blogs[0].author, blogs: 1 };
  }

  let numBlogsPerAuthor = Object.entries(_.countBy(blogs, "author"));
  let winningAuthorAndNum = _.maxBy(numBlogsPerAuthor, function (o) {
    return o[1];
  });

  return { author: winningAuthorAndNum[0], blogs: winningAuthorAndNum[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
