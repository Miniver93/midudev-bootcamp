import { useState } from 'react'

const App = () => {
  //Un estado con el estado inicial de un objeto con el nombre de personas
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson=(e)=>{
    e.preventDefault()
    const personObject={
      name: newName
    }
    setPersons(persons.concat(personObject))
  }

  const handleNameInputChange=(e)=>{
    setNewName(e.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange}/>
        </div>
        <div>debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person)=>{return <li key={persons.length+=1}>{person.name}</li>})}
      </ul>
    </div>
  )
}

export default App
