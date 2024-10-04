import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, editTask, toggleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} editTask={editTask} toggleComplete={toggleComplete} />
      ))}
    </ul>
  );
}

export default TaskList;