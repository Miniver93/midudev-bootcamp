/* eslint-disable react/prop-types */
import { useState } from 'react'

const BtnAnecdote=({anecdote,value,text})=>{
  return(
    <button onClick={()=>value(Math.floor(Math.random()*anecdote.length))}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const points=[]
  anecdotes.forEach(element => {
    element=0
    points.push(element)
  });
  const [selected, setSelected] = useState(0)
  //Creo un nuevo estado donde guardo la puntuación en un array
  const [vote, setVote] = useState(points)

  //Guardo el máximo valor del array vote en max_vote
  const max_vote=vote.reduce((acumulator,currentValue)=>Math.max(acumulator,currentValue))

  //Tengo que guardar la posición del numero mayor de mi array de votos, para luego añadirselo a mis anécdotas
  const max_anecdote=vote.findIndex((element)=>element==max_vote)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>

      <button onClick={()=>{
        const newVotes=[...vote]; /* Guardo en una constante una copia del array de el estado vote */
        newVotes[selected] += 1; /* Aumento en 1 el valor de este array en la posición que se guia por la anecdota seleccionada en estos momentos*/
        setVote(newVotes); /* A mi estado le doy el nuevo valor, que será el que tiene mi array de votos ahora mismo */
      }}>vote</button>
      {/* <button onClick={()=>setSelected(Math.floor(Math.random()*anecdotes.length))}>next anecdote</button> */}
      <BtnAnecdote value={setSelected} anecdote={anecdotes} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[max_anecdote]}
      <p>has {max_vote} votes</p>
    </div>
  )
}

export default App
