import React from 'react';
import './TaskCard.module.css';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`task-card ${task.completed ? 'task-card--completed' : ''}`}>
      <div className="task-card__content">
        <h3 className="task-card__title">{task.title}</h3>
        <p className="task-card__description">{task.description}</p>
        <div className="task-card__meta">
          <span className="task-card__due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
          <span className={`task-card__priority task-card__priority--${task.priority}`}>
            {task.priority}
          </span>
        </div>
      </div>
      <div className="task-card__actions">
        <button onClick={() => onToggleComplete(task.id)} className="task-card__toggle">
          {task.completed ? '↶' : '✓'}
        </button>
        <button onClick={() => onEdit(task)} className="task-card__edit">
          ✏️
        </button>
        <button onClick={() => onDelete(task.id)} className="task-card__delete">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
