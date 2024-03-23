/* eslint-disable react/prop-types */
export const PersonForm=({onSubmit,newName,newNumber,handleName,handleNumber})=>{
    return(
        <form onSubmit={onSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={handleName}/>
        </div>
        <div>
          number: <input type='tel' value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}