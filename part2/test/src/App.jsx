/* eslint-disable react/prop-types */
import Note from "./components/note"


const App = ({notes}) => {
  // const { notes } = props //const notes=props.notes;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
           <li key={note.id}> {/* Siempre tengo que añadir una key */}
            {note.content}
            </li>
            )}
            {notes.map(note=>
              <Note key={note.id} note={note}/>
              )}
      </ul>
    </div>
  )
}

export default App