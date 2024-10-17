import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal';
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md';
import '../styles/TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null); // Track the task to edit

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const accountId = localStorage.getItem('accountId'); // Get the account ID
            const response = await axios.get(`http://localhost:8080/api/tasks?accountId=${accountId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(response.data); // Set tasks from backend response
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    // Function to add a new task
    const addTask = async (task) => {
        try {
            const accountId = localStorage.getItem('accountId'); // Get the account ID
            const response = await axios.post('http://localhost:8080/api/tasks', {
                ...task,
                account: { id: accountId } // Associate with the user's account ID
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks((prevTasks) => [...prevTasks, response.data]); // Add the new task to the list
        } catch (error) {
            console.error('Error adding task', error);
        }
    };

    // Function to update an existing task
    const updateTask = async (task) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, task, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks((prevTasks) => prevTasks.map(t => (t.id === task.id ? response.data : t))); // Update the task in the list
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    // Function to delete a task
    const deleteTask = async (taskId) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?"); // Confirm deletion
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)); // Remove the deleted task from the list
            } catch (error) {
                console.error('Error deleting task', error);
            }
        }
    };

    const openEditModal = (task) => {
        setCurrentTask(task); // Set the current task for editing
        setIsModalOpen(true); // Open the modal
    };

    const handleModalSave = (task) => {
        if (currentTask) {
            updateTask(task); // Update the task if editing
        } else {
            addTask(task); // Otherwise, add a new task
        }
        setIsModalOpen(false); // Close the modal
        setCurrentTask(null); // Reset current task
    };

    return (
        <div className="task-list-container">
            <h2 className="task-list-title">Tasks</h2>
            <div className="add-task-container">
                <button 
                    className="add-task-button" 
                    onClick={() => {
                        setCurrentTask(null); // Reset current task for a new task
                        setIsModalOpen(true); // Open the modal
                    }}
                >
                    <MdAddCircle /> Add Task
                </button>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <div className="task-actions">
                            <MdEdit 
                                className="task-icon" 
                                onClick={() => openEditModal(task)} // Open modal for editing
                            />
                            <MdDelete 
                                className="task-icon" 
                                onClick={() => deleteTask(task.id)} // Delete task
                            />
                        </div>
                        <div className="task-content">
                            <div className="task-title">{task.title}</div>
                            <div className="task-description">{task.description}</div>
                            <div className="task-status">Status: {task.status}</div>
                            <div className="task-due-date">Due: {task.dueDate}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && <div className="overlay open" onClick={() => setIsModalOpen(false)}></div>}
            <TaskModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleModalSave} 
                task={currentTask} 
            />
        </div>
    );
}

export default TaskList;
