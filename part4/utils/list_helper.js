const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogList) => {
  if (blogList.length === 0) {
    return 0;
  } else {
    return blogList.reduce((previusValue, currentValue) => previusValue + currentValue.likes, 0);
  }
}
  module.exports = {
    dummy,
    totalLikes
  }
