import React, { useState } from 'react';
import { taskService } from '../../../services/taskService.js';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [createdTaskId, setCreatedTaskId] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!task.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (task.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters long';
    } else if (task.title.trim().length > 100) {
      newErrors.title = 'Task title must be less than 100 characters';
    }

    if (task.dueDate) {
      const selectedDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (task.description && task.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitStatus(null);
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const taskData = {
        title: task.title.trim(),
        description: task.description.trim() || null,
        dueDate: task.dueDate || null,
        priority: task.priority ? task.priority.toLowerCase() : "low",
        status: 'pending',
      };

      console.log("Creating task with data:", taskData);

      // Call backend API using taskService
      const createdTask = await taskService.createTask(taskData);
      
      console.log('Task created successfully:', createdTask);
      setCreatedTaskId(createdTask.id || createdTask._id); // Handle different ID formats
      setSubmitStatus('success');
      
      setTimeout(() => {
        setTask({ title: '', description: '', dueDate: '', priority: 'medium' });
        setSubmitStatus(null);
        setCreatedTaskId(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error creating task:', error);
      setSubmitStatus('error');
      
      // Handle different error types from the API
      if (error.message.includes('validation')) {
        setErrors({ general: 'Please check your input and try again.' });
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        setErrors({ general: 'Network error. Please check your connection.' });
      } else {
        setErrors({ general: error.message || 'Failed to create task. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setTask(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { color: '#D32F2F', backgroundColor: '#FFEBEE' };
      case 'medium': return { color: '#F57C00', backgroundColor: '#FFF8E1' };
      case 'low': return { color: '#388E3C', backgroundColor: '#E8F5E8' };
      default: return { color: '#757575', backgroundColor: '#F5F5F5' };
    }
  };

  const clearForm = () => {
    setTask({ title: '', description: '', dueDate: '', priority: 'medium' });
    setErrors({});
    setSubmitStatus(null);
    setCreatedTaskId(null);
  };

  const refreshForm = () => {
    clearForm();
    console.log('Form refreshed');
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#FAFBFC',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #DFE1E6',
        borderRadius: '8px',
        padding: '32px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #DFE1E6', paddingBottom: '16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#172B4D',
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📋 Create Issue
            </h1>
            <button
              onClick={refreshForm}
              disabled={isSubmitting}
              style={{
                padding: '6px 12px',
                border: '1px solid #DFE1E6',
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                color: '#5E6C84',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: isSubmitting ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#F4F5F7';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#FFFFFF';
                }
              }}
            >
              🔄 Refresh
            </button>
          </div>
          <p style={{
            color: '#5E6C84',
            margin: '0',
            fontSize: '14px'
          }}>
            Fill out the form below to create a new task in your project.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div style={{
            backgroundColor: '#E3FCEF',
            border: '1px solid #57D9A3',
            borderRadius: '4px',
            padding: '12px 16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#006644' }}>✅</span>
            <div style={{ color: '#006644', fontSize: '14px' }}>
              <strong>Issue created successfully!</strong>
              {createdTaskId && <span> Issue key: {createdTaskId}</span>}
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div style={{
            backgroundColor: '#FFEBE6',
            border: '1px solid #FF8F73',
            borderRadius: '4px',
            padding: '12px 16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#BF2600' }}>❌</span>
            <div style={{ color: '#BF2600', fontSize: '14px' }}>
              <strong>Error:</strong> {errors.general || 'Failed to create issue. Please try again.'}
            </div>
          </div>
        )}

        <div>
          {/* Issue Type & Priority Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px',
            marginBottom: '24px'
          }}>
            {/* Issue Type (Static) */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#5E6C84',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px'
              }}>
                Issue Type
              </label>
              <div style={{
                padding: '8px 12px',
                backgroundColor: '#F4F5F7',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#172B4D'
              }}>
                🐛 Task
              </div>
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#5E6C84',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px'
              }}>
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '8px 32px 8px 12px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="title" style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#5E6C84',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '6px'
            }}>
              Summary *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter a clear, concise title for the issue"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: errors.title ? '2px solid #DE350B' : '2px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: errors.title ? '#FFEBE6' : '#FFFFFF',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                if (!errors.title) {
                  e.target.style.borderColor = '#0052CC';
                }
              }}
              onBlur={(e) => {
                if (!errors.title) {
                  e.target.style.borderColor = '#DFE1E6';
                }
              }}
            />
            {errors.title && (
              <div style={{ color: '#DE350B', fontSize: '12px', marginTop: '4px' }}>
                {errors.title}
              </div>
            )}
            <div style={{ color: '#8993A4', fontSize: '11px', marginTop: '4px' }}>
              {task.title.length}/100 characters
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="description" style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#5E6C84',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '6px'
            }}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Describe the issue in detail. Include steps to reproduce, expected behavior, or acceptance criteria."
              rows={5}
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: errors.description ? '2px solid #DE350B' : '2px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: errors.description ? '#FFEBE6' : '#FFFFFF',
                resize: 'vertical',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                if (!errors.description) {
                  e.target.style.borderColor = '#0052CC';
                }
              }}
              onBlur={(e) => {
                if (!errors.description) {
                  e.target.style.borderColor = '#DFE1E6';
                }
              }}
            />
            {errors.description && (
              <div style={{ color: '#DE350B', fontSize: '12px', marginTop: '4px' }}>
                {errors.description}
              </div>
            )}
            <div style={{ color: '#8993A4', fontSize: '11px', marginTop: '4px' }}>
              {task.description.length}/500 characters
            </div>
          </div>

          {/* Due Date */}
          <div style={{ marginBottom: '32px' }}>
            <label htmlFor="dueDate" style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#5E6C84',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '6px'
            }}>
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                width: '200px',
                padding: '8px 12px',
                border: errors.dueDate ? '2px solid #DE350B' : '2px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: errors.dueDate ? '#FFEBE6' : '#FFFFFF',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                if (!errors.dueDate) {
                  e.target.style.borderColor = '#0052CC';
                }
              }}
              onBlur={(e) => {
                if (!errors.dueDate) {
                  e.target.style.borderColor = '#DFE1E6';
                }
              }}
            />
            {errors.dueDate && (
              <div style={{ color: '#DE350B', fontSize: '12px', marginTop: '4px' }}>
                {errors.dueDate}
              </div>
            )}
          </div>

          {/* Priority Preview */}
          <div style={{
            backgroundColor: '#F4F5F7',
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            padding: '12px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12px', color: '#5E6C84', marginBottom: '6px' }}>
              SELECTED PRIORITY
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              ...getPriorityColor(task.priority)
            }}>
              {getPriorityIcon(task.priority)}
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            paddingTop: '16px',
            borderTop: '1px solid #DFE1E6'
          }}>
            <button
              type="button"
              onClick={clearForm}
              disabled={isSubmitting}
              style={{
                padding: '6px 12px',
                border: '1px solid #DFE1E6',
                backgroundColor: '#FFFFFF',
                color: '#5E6C84',
                borderRadius: '3px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                opacity: isSubmitting ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#F4F5F7';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#FFFFFF';
                }
              }}
            >
              Cancel
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || Object.keys(errors).length > 0}
              style={{
                padding: '6px 16px',
                border: 'none',
                backgroundColor: isSubmitting || Object.keys(errors).length > 0 ? '#B3D4FF' : '#0052CC',
                color: '#FFFFFF',
                borderRadius: '3px',
                cursor: isSubmitting || Object.keys(errors).length > 0 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && Object.keys(errors).length === 0) {
                  e.target.style.backgroundColor = '#0747A6';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting && Object.keys(errors).length === 0) {
                  e.target.style.backgroundColor = '#0052CC';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Creating...
                </>
              ) : (
                'Create Issue'
              )}
            </button>
          </div>
        </div>
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

export default TaskForm;