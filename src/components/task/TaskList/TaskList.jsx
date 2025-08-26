import React, { useState, useEffect } from 'react';
import { taskService } from '../../../services/taskService.js';

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { color: '#D32F2F', backgroundColor: '#FFEBEE', borderColor: '#FFCDD2' };
      case 'medium': return { color: '#F57C00', backgroundColor: '#FFF8E1', borderColor: '#FFE0B2' };
      case 'low': return { color: '#388E3C', backgroundColor: '#E8F5E8', borderColor: '#C8E6C9' };
      default: return { color: '#757575', backgroundColor: '#F5F5F5', borderColor: '#E0E0E0' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today && !task.completed;
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: `1px solid ${task.completed ? '#E0E0E0' : '#DFE1E6'}`,
      borderRadius: '6px',
      padding: '16px',
      marginBottom: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
      opacity: task.completed ? 0.7 : 1,
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
          <button
            onClick={() => onToggleComplete(task.id)}
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #DFE1E6',
              borderRadius: '3px',
              backgroundColor: task.completed ? '#0052CC' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2px'
            }}
          >
            {task.completed && (
              <span style={{ color: '#FFFFFF', fontSize: '12px' }}>✓</span>
            )}
          </button>
          <div style={{ flex: 1 }}>
            <h4 style={{
              margin: '0 0 8px 0',
              fontSize: '14px',
              fontWeight: '500',
              color: task.completed ? '#8993A4' : '#172B4D',
              textDecoration: task.completed ? 'line-through' : 'none',
              lineHeight: '1.4'
            }}>
              {task.title || task.description || `Task #${task.id}`}
            </h4>
            {task.description && (
              <p style={{
                margin: '0 0 12px 0',
                fontSize: '13px',
                color: task.completed ? '#8993A4' : '#5E6C84',
                lineHeight: '1.4',
                textDecoration: task.completed ? 'line-through' : 'none'
              }}>
                {task.description}
              </p>
            )}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '500',
                border: '1px solid',
                ...getPriorityColor(task.priority)
              }}>
                {getPriorityIcon(task.priority)}
                {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
              </div>
              {task.dueDate && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  color: isOverdue(task.dueDate) ? '#DE350B' : '#5E6C84',
                  fontWeight: isOverdue(task.dueDate) ? '500' : '400'
                }}>
                  🗓️ {formatDate(task.dueDate)}
                  {isOverdue(task.dueDate) && <span style={{ color: '#DE350B' }}>(Overdue)</span>}
                </div>
              )}
              <div style={{
                fontSize: '11px',
                color: '#8993A4',
                fontWeight: '400'
              }}>
                #{task.id}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              style={{
                padding: '4px 8px',
                border: '1px solid #DFE1E6',
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#5E6C84'
              }}
            >
              ✏️
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            style={{
              padding: '4px 8px',
              border: '1px solid #FFEBE6',
              backgroundColor: '#FFFFFF',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#DE350B'
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks || []);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError(err.response?.data?.message || 'Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;

      // Optimistic update
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));

      // API call
      await taskService.toggleTaskComplete(taskId, taskToUpdate.completed);
    } catch (error) {
      console.error('Error toggling task:', error);
      // Revert optimistic update
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
      setError(error.response?.data?.message || 'Failed to toggle task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    const originalTasks = [...tasks];

    try {
      setTasks(tasks.filter(task => task.id !== taskId));
      await taskService.deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      setTasks(originalTasks);
      setError(error.response?.data?.message || 'Failed to delete task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    console.log('Edit task:', task);
    alert(`Edit functionality would open here for task: ${task.title || task.description || task.id}`);
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    switch (filter) {
      case 'pending':
        filteredTasks = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filteredTasks = tasks.filter(task => task.completed);
        break;
      default:
        filteredTasks = tasks;
    }

    return filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'created':
        default:
          return b.id - a.id;
      }
    });
  };

  const filteredTasks = getFilteredTasks();
  const pendingCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  if (loading) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          color: '#5E6C84'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #DFE1E6',
            borderTop: '2px solid #0052CC',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '12px'
          }}></div>
          Loading tasks...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#FAFBFC',
      minHeight: '100vh'
    }}>
      <div style={{
        marginBottom: '24px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #DFE1E6',
        borderRadius: '6px',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#172B4D',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📋 Task Board
            </h1>
            <p style={{
              color: '#5E6C84',
              margin: '0',
              fontSize: '14px'
            }}>
              {pendingCount} pending • {completedCount} completed • {tasks.length} total
            </p>
          </div>
          <button
            onClick={loadTasks}
            disabled={loading}
            style={{
              padding: '6px 12px',
              border: '1px solid #DFE1E6',
              backgroundColor: '#FFFFFF',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#5E6C84',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🔄 Refresh
          </button>
        </div>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['all', 'pending', 'completed'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                style={{
                  padding: '4px 12px',
                  border: '1px solid #DFE1E6',
                  backgroundColor: filter === filterOption ? '#0052CC' : '#FFFFFF',
                  color: filter === filterOption ? '#FFFFFF' : '#5E6C84',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textTransform: 'capitalize'
                }}
              >
                {filterOption}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#5E6C84' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '4px 8px',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '12px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="created">Created</option>
            </select>
          </div>
        </div>
      </div>
      {error && (
        <div style={{
          backgroundColor: '#FFEBE6',
          border: '1px solid #FF8F73',
          borderRadius: '4px',
          padding: '12px 16px',
          marginBottom: '20px',
          color: '#BF2600',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>⚠️</span>
          {error}
        </div>
      )}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #DFE1E6',
        borderRadius: '6px',
        padding: '20px'
      }}>
        {filteredTasks.length > 0 ? (
          <div>
            <div style={{
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid #DFE1E6'
            }}>
              <h3 style={{
                margin: '0',
                fontSize: '16px',
                fontWeight: '500',
                color: '#172B4D'
              }}>
                {filter === 'all' ? 'All Tasks' : 
                 filter === 'pending' ? 'Pending Tasks' : 'Completed Tasks'} 
                ({filteredTasks.length})
              </h3>
            </div>
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#5E6C84'
          }}>
            {filter === 'pending' && (
              <>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ margin: '0 0 8px 0', color: '#172B4D' }}>No pending tasks!</h3>
                <p style={{ margin: '0' }}>Great job! You've completed all your tasks.</p>
              </>
            )}
            {filter === 'completed' && (
              <>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                <h3 style={{ margin: '0 0 8px 0', color: '#172B4D' }}>No completed tasks</h3>
                <p style={{ margin: '0' }}>Tasks you complete will appear here.</p>
              </>
            )}
            {filter === 'all' && (
              <>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                <h3 style={{ margin: '0 0 8px 0', color: '#172B4D' }}>No tasks found</h3>
                <p style={{ margin: '0' }}>Create your first task to get started!</p>
              </>
            )}
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default TaskList;