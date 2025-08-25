import React from 'react';
import './App.css';
import Header from './components/common/Header/Header';
import TaskList from './components/task/TaskList/TaskList';
import TaskForm from './components/task/TaskForm/TaskForm';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <h1>Task Reminder System</h1>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;