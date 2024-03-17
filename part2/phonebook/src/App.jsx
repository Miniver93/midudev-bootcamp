import { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { useEffect } from 'react'


import { getAllPhoneBook } from './services/phonebook/getAllPhoneBook'
import { setNumberPhoneBook } from './services/phonebook/setNumberPhoneBook'
import { deleteNumber } from './services/phonebook/deleteNumber'
import { changeNumber } from './services/phonebook/changeNumber'

const App = () => {
  //Un estado con el estado inicial de un objeto con el nombre de personas
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [filterList, setFilterList]=useState('')
 

  useEffect(()=>{
    getAllPhoneBook().then(data=>setPersons(data)).catch(error=>console.error("Cannot load data",error));
    
  },[]) //Cuando numberDeleted sea true, se volverá a cargar los números de teléfono

  const updatePhoneBook = () => {
    getAllPhoneBook()
      .then(data => setPersons(data))
      .catch(error => console.error("Cannot load data", error));
  };

  const id=(persons.length > 0 ? Math.max(...persons.map(person => Number(person.id))) + 1 : 0).toString();

  const personObject={
    name: newName,
    number: newNumber, /* Si la longitud del array es mayor que 0 entonces cojo el la id que tenga mayor en mi array y la incremento en 1 */
    id: id
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    

    //Verifico si mi agenda no contiene el nombre que le quiero añadir
    if (!persons.some((person)=>person.name===personObject.name)) {
      setPersons(prePerson=>prePerson.concat(personObject))
      setNumberPhoneBook(personObject).then(()=>updatePhoneBook()).catch(error=>console.error("Cannot load data",error))
    }else{
      if(confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)){
        //Tengo que recuperar la id del objeto que quiero sustituir
        let id
        persons.some((person)=>person.name===newName ? id=person.id : 0)
        changeNumber(id,personObject).then(()=>updatePhoneBook())
        
      }
    }

  }

  const handleDeleteNumber=(e)=>{
    deleteNumber(e).then(()=>updatePhoneBook())
    
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
      <PersonForm onSubmit={handleSubmit} newName={newName} handleName={handleNameInputChange} newNumber={newNumber} handleNumber={handleNumberInputChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterList={filterList} deleteNumber={handleDeleteNumber}/>
    </div>
  )
}

export default App
