/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'



const App = () => {
  //Inicializo el estado 'notes' con el valor inicial proporcionado el las props.notes, que es el objeto notes del main.jsx
  const [notes, setNotes] = useState([])
  const [newNote,setNewNote]=useState("")
  const [showAll,setShowAll]=useState(true)
  const [updateNote, setUpdateNote]=useState([])

  

    // //Los effectos son para que se ejecuten después del renderizado
    // useEffect(()=>{
    //   //Para que no vuelva a hacer una petición al servidor cuando se vuelva a renderizar la app, tenemos que pasarle una condición con un stado
    //   if(!loading){
    //     fetch("http://localhost:3001/notes").then(response=>response.json()).then(json=>{
    //     const data=json
    //     console.log(data);
    //     setNotes(notes.concat(data))
    //   }); 
    //   }
    //   setLoading(true)
    // },[])//Para que no me haga un loop infinito, tengo que pasarle como parámetro a mi useEffect unas dependencias, que haga que se vuelva a ejecutar el useEffect según los valores que le pase, si lo dejo vacio solo se ejecutará una vez al renderizarse la app, si le paso como parámetro newNote, cada vez que entre un nuevo valor en el input se ejecutará de nuevo
 
    useEffect(()=>{
      noteService.getAll().then(response => {
        setNotes(response.data);
      });
    },[setNotes])

  const addNote = (event) => {
    event.preventDefault()
    //Creación del objeto nueva nota

    const ids = notes.map(note => note.id)
    console.log(ids)
    const idMax = Math.max.apply(null, ids) //Con esto substituyo el objeto cada vez que creo una nueva nota, para que no se copie en memoria las ids


    const noteObject={
      id: idMax + 1, /* Le decimos que la id sea la longitud de todas nuestras notas +1 */
      content: newNote,
      important: Math.random()<0.5 //Su importancia será aleatoria
    }
    noteService.create(noteObject)
    setNotes(notes.concat(noteObject)) /* Concatenamos nuestro nuevo ojbeto nota con nuestrs objetos notas */
    setNewNote('') //Para borrar lo que contiene el input después de guardar la nota
  }

  const handleNoteChange=(event)=>{
    setNewNote(event.target.value)
  }

  //Si showAll es true, noteToShow obtiene el valor de notes directamente, lo que significa que todas las notas se mostrarán. Si showAll es flase se ejecutará un filtro que me devuelve solo las notas que tengan como valor true
  const noteToShow= showAll ? notes : notes.filter(note=> note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>     
      
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