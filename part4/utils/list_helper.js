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



const mostBlogs = (blogList) => {
  if (blogList.length === 0) {
    return 0
  }else{
    const authors = blogList.map(blog => blog.author)
    //Verificamos si el author actual ya existe como clave en prev, si existe, aumentamos su contador en 1, si no existe, establecemos su contador en 1, devolvemos el objeto prev actualizado para la siguiente iteración o como resultado final (estos objetos se van guardando en el objeto vacio que le hemos pasado como parámetro)
    const authorNumberBlogs = authors.reduce((prev, author ) => (prev[author] = prev[author] +1 || 1, prev), {})
    const maxBlogs=Math.max(...Object.values(authorNumberBlogs))
    const author=Object.keys(authorNumberBlogs).reduce((prev,current) => authorNumberBlogs[prev] < authorNumberBlogs[current] ? current : prev)
  
    const objectAuthor = {
      author: author,
      blogs: maxBlogs
    }
    
    return objectAuthor
  }

}


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }
