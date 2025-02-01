import React from 'react'

const Todos = ({ todos }) => {
    if (!todos || todos.length === 0) {
      return <div>No todos found.</div>; // Display a message if there are no todos
    }
  
    return (
      <div>
        {todos.map((todo, index) => {
          if (!todo) return null; // Skip undefined/null todos
          return (
            <div key={index}>
              <h1>{todo.title}</h1>
              <h3>{todo.description}</h3>
              <button>{todo.completed ? "Completed" : "Mark as complete"}</button>
            </div>
          );
        })}
      </div>
    );
  };
export default Todos