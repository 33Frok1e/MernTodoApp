const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const app = express();
const cors = require("cors")
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/todo', async (req, res) => {
  // Zod Validation
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload)
  if(!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs"
    })
    return;
  }
  // Put in MongoDB
  const newTodo = await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
  });

  res.json({
    todo: newTodo
  })
});

app.get('/todos', async (req, res) => {
  const todos = await todo.find(); // It gives a Promise so need to await
  res.json({
    todos
  })
});

app.put('/completed', async (req, res) => {
  // Zod Validation
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if(!parsedPayload.success){
    res.status(411).json({
      msg: "You sent the wrong inputs"
    })
    return;
  }
  // Update in mongoDB
  await todo.update({
    _id: req.body.id
  },{
    completed: true
  });

  res.json({
    msg: "Todo marked as completed"
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});