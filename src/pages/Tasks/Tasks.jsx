import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import TaskCard from '../../components/task/TaskCard';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { useTasks } from '../../hooks/useTasks';
import './Tasks.css';

const Tasks = () => {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    await updateTask(taskId, { completed: !task.completed });
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      case 'overdue':
        return !task.completed && new Date(task.dueDate) < new Date();
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <Layout>
        <div className="tasks-loading">Loading tasks...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="tasks">
        <div className="tasks__header">
          <h1>Tasks</h1>
          <Button onClick={handleCreateTask}>
            + New Task
          </Button>
        </div>

        <div className="tasks__filters">
          <Button 
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'pending' ? 'primary' : 'secondary'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button 
            variant={filter === 'overdue' ? 'primary' : 'secondary'}
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </Button>
        </div>

        <div className="tasks__list">
          {filteredTasks.length === 0 ? (
            <div className="tasks__empty">
              <p>No tasks found.</p>
              <Button onClick={handleCreateTask}>Create your first task</Button>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingTask ? 'Edit Task' : 'Create New Task'}
        >
          <p>Task form will go here...</p>
        </Modal>
      </div>
    </Layout>
  );
};

export default Tasks;
