import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskReminderApp from './components/common/Header/Header'; // <-- This exports TaskReminderApp
import TaskForm from './components/task/TaskForm/TaskForm.jsx';
import TaskList from './components/task/TaskList/TaskList.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskReminderApp />}>
          <Route path="create-task" element={<TaskForm />} />
          <Route path="get-tasks" element={<TaskList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
