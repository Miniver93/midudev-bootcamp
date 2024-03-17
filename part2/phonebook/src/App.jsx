import { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  //Un estado con el estado inicial de un objeto con el nombre de personas
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [filterList, setFilterList]=useState('')

  useEffect(()=>{
    axios.get("http://localhost:3001/persons").then(response=>setPersons(response.data))
  },[])

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
