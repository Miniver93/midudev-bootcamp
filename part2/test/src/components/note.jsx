/* eslint-disable react/prop-types */
const Note = ({ note, toggleImportance, important }) => {
  const label = important 
    ? 'make not important' 
    : 'make important';

  return (
    <li className='note'>
      {note.content} 
      <button onClick={()=>toggleImportance(note)}>{label}</button>
    </li>
  )
}
  export default Note