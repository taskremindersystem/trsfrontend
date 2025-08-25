import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.module.css';

const TaskList = () => {
  // Sample tasks - replace with real data from your backend
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project documentation",
      description: "Write comprehensive documentation for the task reminder system",
      dueDate: "2025-08-30",
      priority: "high",
      completed: false
    },
    {
      id: 2,
      title: "Review code changes",
      description: "Review and approve pending pull requests",
      dueDate: "2025-08-27",
      priority: "medium",
      completed: false
    },
    {
      id: 3,
      title: "Team meeting",
      description: "Weekly standup meeting with the development team",
      dueDate: "2025-08-26",
      priority: "low",
      completed: true
    }
  ]);

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-list">
      <div className="task-section">
        <h3>Pending Tasks ({pendingTasks.length})</h3>
        <div className="tasks-container">
          {pendingTasks.length > 0 ? (
            pendingTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))
          ) : (
            <p className="no-tasks">No pending tasks. Great job! 🎉</p>
          )}
        </div>
      </div>

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3>Completed Tasks ({completedTasks.length})</h3>
          <div className="tasks-container">
            {completedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;