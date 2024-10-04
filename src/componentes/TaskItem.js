  import React from 'react';

  const TaskItem = ({ task, toggleComplete, editTask, deleteTask }) => {
    return (
      <div>
        <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </h3>
        <p>{task.description}</p>
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? 'Desmarcar' : 'Concluir'}
        </button>
        <button onClick={() => editTask(task.id)}>Editar</button>
        <button onClick={() => deleteTask(task.id)}>Excluir</button>
      </div>
    );
  };

  export default TaskItem;
