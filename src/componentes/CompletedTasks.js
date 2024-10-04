import React from 'react';
import TaskItem from './TaskItem'; // Importe o TaskItem diretamente
import App from '../App.css';


const CompletedTasks = ({ tasks, toggleComplete, editTask, deleteTask }) => {
  // Filtrar as tarefas concluídas aqui (não precisa mais no App.js)

 return (
    <div>
        <h2>Tarefas Concluídas:</h2> {/* ou outro título*/}
        {tasks.map((task)=>(
          <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} editTask={editTask} deleteTask={deleteTask}/>
        ))}
    </div>
 );

};

export default CompletedTasks;