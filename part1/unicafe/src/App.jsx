/* eslint-disable react/prop-types */
import { useState } from 'react'

let array_votos=[]

const BtnStatistics=({text,onClick})=>{
  return (<button onClick={onClick}>{text}</button>)
}
const StatisticLine =({text,value})=>{
  return(
    <>
    <p>{text} {value}</p>
    </>
  )
}
const Statistics = (props)=>{
  return(
  <div>
        <h1>statistics</h1>
    <StatisticLine text="good" value={props.good}/>
    <StatisticLine text="neutral" value={props.neutral}/>
    <StatisticLine text="bad" value={props.bad}/>
    <StatisticLine text="all" value={props.all}/>
    <StatisticLine text="average" value={props.average}/>
    <StatisticLine text="positive" value={props.positive}/>
  </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
 

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
      <BtnStatistics onClick={handleOnClick} text="good"/>
      <BtnStatistics onClick={handleOnClick} text="neutral"/>
      <BtnStatistics onClick={handleOnClick} text="bad"/>
      {(good===0 && neutral===0 && bad===0 && bad===0 && all===0 && average===0 && positive===0) ? <p>No feedback given</p>  : <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>}



    </div>
  )
}

export default App
