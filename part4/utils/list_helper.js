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

const favoriteBlog = (blogList) => {
  if(blogList.length === 0){
    return 0
  }else{
    const mostLikes = Math.max(...blogList.map(blog => blog.likes)) //Aquí lo que estoy haciendo es buscar cual es el blog que más likes tiene

    return blogList.find(blog => blog.likes === mostLikes) //Aquí recupero el blog que tenga el mayor número de likes
     
  }
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
