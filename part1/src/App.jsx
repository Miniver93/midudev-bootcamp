const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p style={{color: props.color}}>Hello, {props.name}, you are {props.age} years old</p>
    </div>
  )
}

//Creo un elemento llamado Btn_alert, dentro de este elemento hago una función con el nombre que yo quiera, en este caso handleCLick, que hará un callback cuando a está función la llame y me ejecutará lo que tiene esa función. Retorno mi elemento, que en este caso es un botón, dándole un listener on click y pasándole la función que quiero que me ejecute
const Btn_alert = ()=>{
  const handleClick=()=>{
    alert("Hola, ¿Qué tal?")
  }
  return(  
  <div>
    <button onClick={handleClick}>Click aquí</button>
  </div>)
}

// const Btn_numeros=()=>{
//   const numeros_1_al_9=()=>{
//     const array=[1,2,3,4,5,6,7,8,9]
//     return array.map(numero=><p key={numero}>{numero}</p>);
//   };
//   return(
//     <div>
//       <button onClick={numeros_1_al_9}>Numeros</button>
//     </div>
    
//   )
// }

const Sumar=(props)=>{
  
    const resultado=props.num1+props.num2
  
    return <p>{resultado}</p>
  
}
const App = () => {
  const name="Peter"
  const age= 25
  return (
    //Para que no de errores al renderizar los elementos, siempre tengo que tener un div y después los elementos, si por algún casual no quiero un div extra, basta con poner <> y al final </>
    <div>
      <h1>Greetings</h1>
      <Hello />

      <Hello />
      <Hello />
      <Hello color="red" name='Jose' age={age + 5}/>
      <Hello name={name} age={age} />
      <Btn_alert/>
      <Sumar num1={5} num2={6} />
      <p>{+new Date()}</p>
    </div>
  )
}


export default App