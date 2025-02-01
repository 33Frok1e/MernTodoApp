import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'

function App() {
  const [todos, setTodos] = useState([])

  // Fetch data only once when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos || []); // Ensure `todos` is an array // Update state with fetched todos
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []); // Empty dependency array ensures this runs only once

    // Function to add a new todo to the state
    const addTodo = (newTodo) => {
      if (!newTodo) return; // Skip if newTodo is undefined/null
      setTodos((prevTodos) => [...prevTodos, newTodo]); // Update state correctly
    };
  return (
    <>
      <CreateTodo addTodo={addTodo} />
      <Todos todos={todos} />
    </>
  )
}

export default App
