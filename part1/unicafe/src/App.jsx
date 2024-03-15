import { useState } from 'react'
let array_votos=[]
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState()
 

  const handleOnClick=(e)=> {
    const v_good=1
    const v_neutral=0
    const v_bad=-1
    let suma_votos=0

    if (e.target.textContent=="good") {
      setGood(good + 1)
      array_votos.push(v_good)
    }else if(e.target.textContent=="neutral"){
      setNeutral(neutral + 1)
      array_votos.push(v_neutral)
    }else if(e.target.textContent=="bad"){
      setBad(bad + 1)
      array_votos.push(v_bad)
    }
    setAll(good + neutral + bad +1)

    array_votos.forEach(voto => {
      suma_votos+=voto 
    })
    setAverage((suma_votos/array_votos.length).toFixed(2)) 

  setPositive((good*100/all).toFixed(2))
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleOnClick}>good</button>
      <button onClick={handleOnClick}>neutral</button>
      <button onClick={handleOnClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>

    </div>
  )
}

export default App
