/* eslint-disable react/prop-types */
const Courses = ({ course }) => {
    const Header = () => {
      return (
        <header>
          <h1>Web development curriculum</h1>
        </header>
      )
    }
  
    const Course1 = ({ course }) => {
      const total_exercises_part1 = course.parts.reduce((total, part) => total + part.exercises, 0);
  
      const Content = () => {
        const Part = ({ part }) => {
          return (
            <p>{part.name} {part.exercises}</p>
          )
        }
  
        return (
          <main>
            {course.parts.map(part => (
              <Part key={part.id} part={part} />
            ))}
            <p style={{ fontWeight: 'bold' }}>total of {total_exercises_part1} exercises</p>
          </main>
        )
      }
  
      return (
        <>
          <h2>{course.name}</h2>
          <Content />
        </>
      )
    }
  
    const Course2 = ({ course }) => {
      const total_exercises_part2 = course.parts.reduce((total, part) => total + part.exercises, 0);
  
      const Content = () => {
        const Part = ({ part }) => {
          return (
            <p>{part.name} {part.exercises}</p>
          )
        }
  
        return (
          <main>
            {course.parts.map(part => (
              <Part key={part.id} part={part} />
            ))}
            <p style={{ fontWeight: 'bold' }}>total of {total_exercises_part2} exercises</p>
          </main>
        )
      }
  
      return (
        <>
          <h2>{course.name}</h2>
          <Content />
        </>
      )
    }
  
    return (
      <>
        <Header />
        <Course1 course={course[0]} />
        <Course2 course={course[1]} />
      </>
    )
  }

  export default Courses