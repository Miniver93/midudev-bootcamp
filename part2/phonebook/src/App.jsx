import { useState } from 'react'

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
      <div>
        filter shown with <input type="text" value={filterList} onChange={handleFilterList}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameInputChange}/>
        </div>
        <div>
          number: <input type='tel' value={newNumber} onChange={handleNumberInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {/* Aquí estoy filtrando mi array pero que solo renderize a las personas que contengan el filtro, que sería el texto que le indico arriba. Si contiene tal, renderizate,  */}
        {persons.filter(person=>person.name.toLowerCase().includes(filterList.toLowerCase()) || person.number.includes(filterList)
          
        ).map((person)=>{return <li key={persons.length+=1}>{person.name} {person.number}</li>})}
      </ul>
    </div>
  )
}

export default App
