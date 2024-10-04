const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Importe o uuid
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

// GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks  (MODIFICADO)
app.post('/tasks', (req, res) => {
  const newTask = { id: uuidv4(), ...req.body }; // Use uuidv4() para gerar o ID
  tasks.push(newTask);
  res.status(201).json(newTask);
});


// PUT /tasks/:id (MODIFICADO - usando string para id)
app.put('/tasks/:id', (req, res) => {

  const taskId = req.params.id; // Trate o ID como string
  const taskIndex = tasks.findIndex(task => task.id === taskId);



  if (taskIndex === -1) {

    return res.status(404).send('Task not found');

  }



  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };

  res.json(tasks[taskIndex]);

});



// DELETE /tasks/:id (MODIFICADO - usando string para id)

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;   // Trate o ID como string
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send('Task not found');
  }

  tasks.splice(taskIndex, 1);
  res.sendStatus(204);

});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});