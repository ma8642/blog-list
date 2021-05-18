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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
