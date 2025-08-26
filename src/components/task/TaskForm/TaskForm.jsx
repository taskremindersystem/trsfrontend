import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task submitted:', task);
    // Add your task creation logic here
    setTask({ title: '', description: '', dueDate: '', priority: 'medium' });
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '20px' }}>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Task Title"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            placeholder="Enter task title..."
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task description..."
            multiline
            rows={3}
            variant="outlined"
          />
        </FormControl>

        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Due Date"
              id="dueDate"
              name="dueDate"
              type="date"
              value={task.dueDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          style={{ marginTop: '20px' }}
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;