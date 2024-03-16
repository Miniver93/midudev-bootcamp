import { useState } from 'react'

const App = () => {
  //Un estado con el estado inicial de un objeto con el nombre de personas
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')

  const addPerson=(e)=>{
    e.preventDefault()
    const personObject={
      name: newName,
      number: newNumber
    }
    //Verifico si mi agenda no contiene el nombre que le quiero añadir
    if (!persons.some((element)=>element.name===personObject.name)) {
      setPersons(persons.concat(personObject))
    }else{
      alert(`${newName} is already added to phonebook`)
    }
    console.log(personObject);

  }

  const handleNameInputChange=(e)=>{

    setNewName(e.target.value)
  }

  const handleNumberInputChange=(e)=>{
    setNewNumber(e.target.value)
  }

 
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange}/>
        </div>
        <div>debug: {newNumber}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person)=>{return <li key={persons.length+=1}>{person.name} {person.number}</li>})}
      </ul>
    </div>
  )
}

export default App
