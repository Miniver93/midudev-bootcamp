const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const average = (array) => {
    
    const reducer = (sum, item) => {
      return sum + item
    }
    //Aquí cuando llamemos a nuestra función average, le pasaremos un array con números, los cuales estos estos números serán sumados entre si, ya que reducer es el resultado de los números sumados. Y entonces haremos la división de esos números por la longitud de nuestro array . Esto sirve para calcular la media, 0 será el acumulador, que lo ponemos en 0 para que no acumule nada
    return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length //Si la longitud del array es 0, devuelveme 0
    
  }

  module.exports = {
    reverse,
    average,
  }