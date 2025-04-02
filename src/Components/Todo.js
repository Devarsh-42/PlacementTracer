import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, isCompleted: false }]);
    setNewTask("");
  };

  const NavBackHome = () => async () => {
    navigate('/');
  };

  // Toggle task completion
  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>To-Do List</h1>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            style={styles.input}
          />
          <button onClick={handleAddTask} style={styles.addButton}>
            Add Task
          </button>
        </div>
        <ul style={styles.taskList}>
          {tasks.map((task, index) => (
            <li key={index} style={styles.task}>
              <span
                onClick={() => handleToggleTask(index)}
                style={{
                  ...styles.taskText,
                  textDecoration: task.isCompleted ? "line-through" : "none",
                  color: task.isCompleted ? "#aaa" : "#333",
                }}
              >
                {task.text}
              </span>
              <button onClick={() => handleDeleteTask(index)} style={styles.deleteButton}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={NavBackHome} className="action-button">
            Decrement
        </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3498db",
    color: "white",
    transition: "0.3s ease",
  },
  taskList: {
    listStyleType: "none",
    padding: "0",
    marginTop: "20px",
    textAlign: "left",
  },
  task: {
    fontSize: "18px",
    padding: "10px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  taskText: {
    flex: 1,
    paddingRight: "10px",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#e74c3c",
    color: "white",
    transition: "0.3s ease",
  },
};

export default Todo;