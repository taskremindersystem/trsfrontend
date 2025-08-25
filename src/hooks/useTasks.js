import { useState, useEffect } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      // const data = await taskService.getTasks();
      // setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setError(null);
      // const newTask = await taskService.createTask(taskData);
      // setTasks(prev => [...prev, newTask]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateTask = async (taskId, updateData) => {
    try {
      setError(null);
      // const updatedTask = await taskService.updateTask(taskId, updateData);
      // setTasks(prev => prev.map(task => 
      //   task.id === taskId ? updatedTask : task
      // ));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError(null);
      // await taskService.deleteTask(taskId);
      // setTasks(prev => prev.filter(task => task.id !== taskId));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks
  };
};
