export const Persons=({persons,filterList})=>{
    return(
        <ul>
        {/* Aquí estoy filtrando mi array pero que solo renderize a las personas que contengan el filtro, que sería el texto que le indico arriba. Si contiene tal, renderizate,  */}
        {persons.filter(person=>person.name.toLowerCase().includes(filterList.toLowerCase()) || person.number.includes(filterList)
          
        ).map((person)=>{return <li key={person.id}>{person.name} {person.number}</li>})}
      </ul>
    )
  }
