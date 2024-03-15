/* eslint-disable react/prop-types */

const Course=({course})=>{
  const Header=()=>{
    return(
      <header>
        <h1>{course.name}</h1>
      </header>
      )
  }
  const Content=()=>{
    const Part1=()=>{
      return(
        <p>{course.parts[0].name} {course.parts[0].exercises}</p>
      )
    }
    const Part2=()=>{
      return(
        <p>{course.parts[1].name} {course.parts[1].exercises}</p>
      )
    }
    const Part3=()=>{
      return(
        <p>{course.parts[2].name} {course.parts[2].exercises}</p>
      )
    }
    const Part4=()=>{
      return(
        <p>{course.parts[3].name} {course.parts[3].exercises}</p>
      )
    }
    return(
      <main>
        <Part1/>
        <Part2/>
        <Part3/>
        <Part4/>
      </main>
  
    )
  }
  return(
    <>
    <Header/>
    <Content/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App