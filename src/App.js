import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const TaskList = ({ tasks, deleteTask, editTask, toggleComplete }) => {
  return (
    <ul>
      {tasks.filter(task => !task.completed).map((task) => (
        <li key={task.id} className="task-item">
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}: {task.description}
          </span>
          <div className="button-group">
            <button onClick={() => editTask(task.id)}>Editar</button>
            <button onClick={() => deleteTask(task.id)}>Excluir</button>
            <button onClick={() => toggleComplete(task.id)}>Concluir</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const TaskForm = ({ addTask, setTitle, setDescription, editingTask, setEditingTask }) => {
  const [localTitle, setLocalTitle] = useState('');
  const [localDescription, setLocalDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setLocalTitle(editingTask.title);
      setLocalDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localTitle.trim()) return;

    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      title: localTitle,
      description: localDescription,
      completed: editingTask ? editingTask.completed : false
    };

    addTask(newTask);

    setLocalTitle('');
    setLocalDescription('');
    setTitle('');
    setDescription('');

    if (editingTask) {
      setEditingTask(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Título"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        value={localDescription}
        onChange={(e) => setLocalDescription(e.target.value)}
      ></textarea>
      <button type="submit">{editingTask ? 'Salvar Tarefa' : 'Adicionar Tarefa'}</button>
    </form>
  );
};

const CompletedTasks = ({ tasks, deleteTask }) => {
  return (
    <ul>
      {tasks.filter(task => task.completed).map((task) => (
        <li key={task.id} className="task-item">
          <span>{task.title}: {task.description}</span>
          <button onClick={() => deleteTask(task.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [editingTask, setEditingTask] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false); // Adicionei esta linha

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    if (editingTask) {
      setTasks(tasks.map(task => (task.id === editingTask.id ? newTask : task)));
    } else {
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
    }
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTask(taskToEdit);
    setTitle(taskToEdit?.title ?? '');
    setDescription(taskToEdit?.description ?? '');
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <h1>Lista de Tarefas</h1>
        <TaskForm
          addTask={addTask}
          setTitle={setTitle}
          setDescription={setDescription}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />

        <div className="button-group">
          <Link className='button_tarefas' to="/" onClick={() => setShowCompleted(false)}>Tarefas Pendentes</Link>
          <Link className='button_tarefas' to="/completed" onClick={() => setShowCompleted(true)}>Tarefas Concluídas</Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Tarefas Pendentes</h2>
                <TaskList
                  tasks={tasks}
                  deleteTask={deleteTask}
                  editTask={editTask}
                  toggleComplete={toggleComplete}
                />
              </>
            }
          />
          <Route
            path="/completed"
            element={<CompletedTasks tasks={tasks} deleteTask={deleteTask} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
