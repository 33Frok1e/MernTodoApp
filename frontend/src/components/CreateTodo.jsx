import React, { useState } from 'react'

const CreateTodo = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTodo = async () => {
        try {
          const response = await fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              title,
              description,
            }),
            headers: {
              "Content-Type": "application/json", // Correct header key
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to add todo");
          }
    
          const json = await response.json();
          alert("Todo Added");
    
          addTodo(json.todo); // newTodo
          // Reset input fields after successful submission
          setTitle('');
          setDescription('');
        } catch (error) {
          console.error("Error adding todo:", error);
          alert("Failed to add todo");
        }
      };
  return (
    <div>
        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: 10, margin: 10 }}
            type="text"
            placeholder="Title"
        />
        <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: 10, margin: 10 }}
            type="text"
            placeholder="Description"
        />
        <button style={{padding: 10, margin: 10}} onClick={() => handleAddTodo()} >Add Todo</button>
    </div>
  )
}

export default CreateTodo