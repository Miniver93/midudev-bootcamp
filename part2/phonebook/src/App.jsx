import { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  //Un estado con el estado inicial de un objeto con el nombre de personas
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [filterList, setFilterList]=useState('')

  const addPerson=(e)=>{
    e.preventDefault();
    const personObject={
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    //Verifico si mi agenda no contiene el nombre que le quiero añadir
    if (!persons.some((person)=>person.name===personObject.name)) {
      setPersons(persons.concat(personObject))
    }else{
      alert(`${newName} is already added to phonebook`)
    }
    console.table(personObject)

  }

  const handleNameInputChange=(e)=>{
    const input=e.target.value;
    const lettersOnly=input.replace(/[^a-zA-Z\s]/g, '')
    setNewName(lettersOnly)
  }

  const handleNumberInputChange=(e)=>{
  const input = e.target.value; //Guardo el valor que escribo en input
  const numbersOnly = input.replace(/[^\d-]/g, ''); // Remueve todos los caracteres que no sean dígitos

  setNewNumber(numbersOnly); //Cambio el valor de mi estado por mi input ya filtrado
  }

  const handleFilterList=(e)=>{
    setFilterList(e.target.value)
  }

  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filterList} onChange={handleFilterList}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleName={handleNameInputChange} newNumber={newNumber} handleNumber={handleNumberInputChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterList={filterList}/>
    </div>
  )
}

export default App
