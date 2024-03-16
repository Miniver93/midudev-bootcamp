/* eslint-disable react/prop-types */
import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  //Inicializo el estado 'notes' con el valor inicial proporcionado el las props.notes, que es el objeto notes del main.jsx
  const [notes, setNotes] = useState(props.notes)
  const [newNote,setNewNote]=useState("A new note")
  const [showAll,setShowAll]=useState(true)

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    //Creación del objeto nueva nota
    const noteObject={
      id: notes.length+1, /* Le decimos que la id sea la longitud de todas nuestras notas +1 */
      content: newNote,
      important: Math.random()<0.5 //Su importancia será aleatoria
    }
    setNotes(notes.concat(noteObject)) /* Concatenamos nuestro nuevo ojbeto nota con nuestrs objetos notas */
    setNewNote('') //Para borrar lo que contiene el input después de guardar la nota
  }

  const handleNoteChange=(event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  //Si showAll es true, noteToShow obtiene el valor de notes directamente, lo que significa que todas las notas se mostrarán. Si showAll es flase se ejecutará un filtro que me devuelve solo las notas que tengan como valor true
  const noteToShow= showAll ? notes : notes.filter(note=> note.important)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>{/* Le estoy añadiendo el preventDefault al formulario y la nota*/}
        <input value={newNote} onChange={handleNoteChange}/>{/* Le estoy agregando como valor el estado inicial A new note, cuando este valor cambia por otro, con el evento onchange, se guarda ese valor en el stado setNewNote */}
        <button type="submit">save</button>
      </form> 
      <h2>Important notes</h2>
      <ul>
      {noteToShow.map(note=>
          <Note key={note.id} note={note}/>)}
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}> {/* Cambio el valor de mi estado showAll, si es true lo camio a false y si es false lo cambio a true */}
          show {showAll ? 'important' : 'all' } {/* El texto cambia según cual sea su valor ahora mismo */}
        </button>
      </div>
    </div>
  )
}

export default App 