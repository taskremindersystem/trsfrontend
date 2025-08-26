import React, { useState, useEffect } from 'react';
import { taskService } from '../../../services/taskService.js';

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [task, isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      }
      
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        if (formData.title.trim() && !isSubmitting) {
          handleSubmit(e);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, formData.title, isSubmitting, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const updatedTask = {
        ...task,
        ...formData,
        dueDate: formData.dueDate || null
      };
      await onSave(updatedTask);
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease-out',
          cursor: 'pointer'
        }}
      />
      
      {/* Modal Container */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        pointerEvents: 'none'
      }}>
        {/* Modal Content */}
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            maxWidth: '700px',
            width: '150%',
            maxHeight: '90vh',
            overflow: 'hidden',
            animation: 'modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'auto',
            position: 'relative'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg,rgb(149, 153, 160) 0%, #e9e5ec 100%)',
            color: '#FFFFFF',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
              opacity: 0.1
            }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <div>
                <h2 style={{
                  margin: '0 0 4px 0',
                  fontSize: '24px',
                  fontWeight: '700',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}>
                  ✏️ Edit Task
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  opacity: 0.9,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                }}>
                  Update task #{task?.id} • Press Esc to close
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(209, 10, 10, 0.2)',
                  border: 'none',
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  color: 'rgb(211, 18, 18)',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: '0' }}>
            <div style={{ padding: '24px', paddingBottom: '0' }}>
              {/* Title Field */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#172B4D',
                  marginBottom: '8px'
                }}>
                  📝 Task Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #DFE1E6',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#FAFBFC',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0052CC';
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#DFE1E6';
                    e.target.style.backgroundColor = '#FAFBFC';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Description Field */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#172B4D',
                  marginBottom: '8px'
                }}>
                  📄 Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add task description..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #DFE1E6',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '80px',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#FAFBFC',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0052CC';
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#DFE1E6';
                    e.target.style.backgroundColor = '#FAFBFC';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Priority and Due Date Row */}
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px'
              }}>
                {/* Priority Field */}
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#172B4D',
                    marginBottom: '8px'
                  }}>
                    ⚡ Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #DFE1E6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      backgroundColor: '#FAFBFC',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0052CC';
                      e.target.style.backgroundColor = '#FFFFFF';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#DFE1E6';
                      e.target.style.backgroundColor = '#FAFBFC';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>

                {/* Due Date Field */}
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#172B4D',
                    marginBottom: '8px'
                  }}>
                    📅 Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #DFE1E6',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      backgroundColor: '#FAFBFC',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0052CC';
                      e.target.style.backgroundColor = '#FFFFFF';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#DFE1E6';
                      e.target.style.backgroundColor = '#FAFBFC';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Priority Preview */}
              <div style={{
                padding: '16px',
                backgroundColor: '#F4F5F7',
                borderRadius: '8px',
                marginBottom: '24px',
                border: '1px solid #DFE1E6'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#5E6C84',
                  marginBottom: '8px',
                  fontWeight: '600'
                }}>
                  PREVIEW
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  border: '1px solid',
                  backgroundColor: (() => {
                    switch (formData.priority) {
                      case 'high': return '#FFEBEE';
                      case 'medium': return '#FFF8E1';
                      case 'low': return '#E8F5E8';
                      default: return '#F5F5F5';
                    }
                  })(),
                  borderColor: (() => {
                    switch (formData.priority) {
                      case 'high': return '#FFCDD2';
                      case 'medium': return '#FFE0B2';
                      case 'low': return '#C8E6C9';
                      default: return '#E0E0E0';
                    }
                  })(),
                  color: (() => {
                    switch (formData.priority) {
                      case 'high': return '#D32F2F';
                      case 'medium': return '#F57C00';
                      case 'low': return '#388E3C';
                      default: return '#757575';
                    }
                  })()
                }}>
                  {getPriorityIcon(formData.priority)}
                  {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '20px 24px',
              backgroundColor: '#F4F5F7',
              borderTop: '1px solid #DFE1E6',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 20px',
                  border: '2px solid #DFE1E6',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#5E6C84',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#B3BAC5';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#DFE1E6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.title.trim()}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  background: isSubmitting || !formData.title.trim() 
                    ? '#B3BAC5' 
                    : 'linear-gradient(135deg, #0052CC 0%, #0065FF 100%)',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  cursor: isSubmitting || !formData.title.trim() ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  boxShadow: '0 2px 4px rgba(0, 82, 204, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && formData.title.trim()) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 82, 204, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 82, 204, 0.2)';
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid #FFFFFF',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Saving...
                  </>
                ) : (
                  <>💾 Save Changes</>
                )}
              </button>
            </div>
            
            {/* Keyboard Shortcut Hint */}
            <div style={{
              padding: '12px 24px',
              backgroundColor: '#F8F9FA',
              borderTop: '1px solid #E3E6EA',
              fontSize: '11px',
              color: '#6C757D',
              textAlign: 'center'
            }}>
              💡 Press <kbd style={{ 
                backgroundColor: '#E9ECEF', 
                padding: '2px 6px', 
                borderRadius: '3px',
                fontFamily: 'monospace'
              }}>Ctrl+Enter</kbd> to save • <kbd style={{ 
                backgroundColor: '#E9ECEF', 
                padding: '2px 6px', 
                borderRadius: '3px',
                fontFamily: 'monospace'
              }}>Esc</kbd> to cancel
            </div>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes modalSlideIn {
            from { 
              opacity: 0;
              transform: scale(0.9) translateY(-10px);
            }
            to { 
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

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
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${task.completed ? '#E0E0E0' : '#DFE1E6'}`,
        borderRadius: '6px',
        padding: '16px',
        marginBottom: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        opacity: task.completed ? 0.7 : 1,
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
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
              marginTop: '2px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!task.completed) {
                e.target.style.borderColor = '#0052CC';
                e.target.style.backgroundColor = 'rgba(0, 82, 204, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!task.completed) {
                e.target.style.borderColor = '#DFE1E6';
                e.target.style.backgroundColor = '#FFFFFF';
              }
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
              title="Edit task"
              style={{
                padding: '4px 8px',
                border: '1px solid #DFE1E6',
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#5E6C84',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#0052CC';
                e.target.style.color = '#0052CC';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = 'rgba(0, 82, 204, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#DFE1E6';
                e.target.style.color = '#5E6C84';
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = '#FFFFFF';
              }}
            >
              ✏️
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            title="Delete task"
            style={{
              padding: '4px 8px',
              border: '1px solid #FFEBE6',
              backgroundColor: '#FFFFFF',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#DE350B',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#DE350B';
              e.target.style.backgroundColor = '#FFEBE6';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#FFEBE6';
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.transform = 'scale(1)';
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
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // NEW: State for search query
  const [searchQuery, setSearchQuery] = useState('');

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
      // Optimistic update
      setTasks(tasks.filter(task => task.id !== taskId));
      setError(null);

      // API call
      await taskService.deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      // Revert optimistic update
      setTasks(originalTasks);
      setError(error.response?.data?.message || 'Failed to delete task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (updatedTask) => {
    try {
      // Optimistic update
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ));

      // API call
      await taskService.updateTask(updatedTask.id, updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      // Revert optimistic update
      loadTasks();
      setError(error.response?.data?.message || 'Failed to update task. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // NEW: Handler for search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // NEW: Handler to clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    // NEW: Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        (task.title && task.title.toLowerCase().includes(query)) ||
        (task.description && task.description.toLowerCase().includes(query)) ||
        (task.id.toString().includes(query))
      );
    }

    switch (filter) {
      case 'pending':
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      default:
        filteredTasks = filteredTasks;
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
          {/* /* Replace the existing search input container and input styles in TaskList.jsx */ }
          <div style={{
            flex: '1',
            minWidth: '50px', /* Reduced from 200px for a smaller width */
            position: 'relative'
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title, description, or ID..."
              style={{
                width: '100%',
                padding: '6px 28px 6px 10px', /* Reduced padding for a smaller height */
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '12px', /* Reduced font size for compactness */
                backgroundColor: '#FAFBFC',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0052CC';
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#DFE1E6';
                e.target.style.backgroundColor = '#FAFBFC';
                e.target.style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                style={{
                  position: 'absolute',
                  right: '3px', /* Adjusted for smaller input */
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#5E6C84',
                  cursor: 'pointer',
                  fontSize: '12px' /* Matches reduced input font size */
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
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
                <h3 style={{ margin: '0 0 8px 0', color: '#172B4D' }}>
                  {searchQuery ? 'No tasks match your search' : 'No tasks found'}
                </h3>
                <p style={{ margin: '0' }}>
                  {searchQuery ? 'Try a different search term.' : 'Create your first task to get started!'}
                </p>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Edit Task Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
      />
      
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
