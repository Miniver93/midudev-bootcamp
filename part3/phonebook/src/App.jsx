import { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { useEffect } from 'react'
import { Notification } from './components/Notification'

import { getAllPhoneBook } from './services/phonebook/getAllPhoneBook'
import { setNumberPhoneBook } from './services/phonebook/setNumberPhoneBook'
import { deleteNumber } from './services/phonebook/deleteNumber'
import { changeNumber } from './services/phonebook/changeNumber'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterList, setFilterList] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(false);
  const [messageTimer, setMessageTimer] = useState(null);

  useEffect(() => {
    getAllPhoneBook()
      .then(data => setPersons(data))
      .catch(error => console.error("Cannot load data", error));
  }, []);

  const updatePhoneBook = () => {
    getAllPhoneBook()
      .then(data => setPersons(data))
      .catch(error => console.error("Cannot load data", error));
  };

  const id = (persons.length > 0 ? Math.max(...persons.map(person => Number(person.id))) + 1 : 0).toString();

  const handleMessage = (message, messageType, duration) => {
    setMessageType(messageType);
    setMessage(message);
    if (messageTimer) {
      clearTimeout(messageTimer); // Cancelar el temporizador existente
    }
    setMessageTimer(setTimeout(() => {
      setMessage(null);
    }, duration));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: id
    };

    if(personObject.name.length < 3){
      handleMessage(`Person validation failed: name: Path "name" (${newName}) is shorter than the minium allowed length (${newName.length}).`, false, 4000)
      return //Para parar la ejecución del script
    }else if(personObject.number.length < 8){
      handleMessage(`Person validation failed: number: Path "number" (${newNumber}) is shorter than the minium allowed length (${newNumber.length}).`, false, 4000)
      return //Para parar la ejecución del script
    }

    if (!persons.some(person => person.name === personObject.name)) {
      setPersons(prevPersons => prevPersons.concat(personObject));
      setNumberPhoneBook(personObject)
        .then(() => {
          updatePhoneBook();
          handleMessage(`Added ${newName}`, true, 4000);
        })
        .catch(error => console.error("Cannot load data", error));
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let id;
        persons.some(person => person.name === newName ? id = person.id : 0);
        changeNumber(id, personObject)
          .then(() => {
            updatePhoneBook();
            handleMessage(`${newName} modified`, true, 4000);
          })
          .catch(error => console.error("Cannot load data", error));
      }
    }
  };

  const handleDeleteNumber = (id, name) => {
    deleteNumber(id)
      .then(() => {
        updatePhoneBook();
        handleMessage(`Information of ${name} has already been removed from server`, false, 4000);
      })
      .catch(error => console.error("Cannot load data", error));
  };

  const handleNameInputChange = (e) => {
    const input = e.target.value;
    const lettersOnly = input.replace(/[^a-zA-Z\s]/g, '');
    setNewName(lettersOnly);
  };

  const handleNumberInputChange = (e) => {
    const input = e.target.value;
    const numbersOnly = input.replace(/[^\d-]/g, '');
    setNewNumber(numbersOnly);
  };

  const handleFilterList = (e) => {
    setFilterList(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification messageInfo={message} messageError={message} messageType={messageType}/>
      <Filter value={filterList} onChange={handleFilterList}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit} newName={newName} handleName={handleNameInputChange} newNumber={newNumber} handleNumber={handleNumberInputChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterList={filterList} deleteNumber={handleDeleteNumber}/>
    </div>
  );
};

export default App;