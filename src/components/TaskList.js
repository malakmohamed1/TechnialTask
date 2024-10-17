import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal';
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md';
import '../styles/TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch tasks only if accountId is present
    useEffect(() => {
        const accountId = localStorage.getItem('accountId');
        console.log("Account ID from Local Storage:", accountId);
        
        if (accountId) {
            fetchTasks();
        } else {
            console.error("No Account ID found. Please log in.");
        }
    }, []); // Run once when component mounts

    const fetchTasks = async () => {
        setLoading(true); // Start loading state
        console.log("Fetching tasks...");

        try {
            const accountId = localStorage.getItem('accountId');
            console.log("Account ID:", accountId);
            
            if (!accountId) {
                console.error("Account ID is not available.");
                return; // Early return if account ID is missing
            }
            console.log("before api");

            const response = await axios.get(`http://localhost:8080/api/tasks?accountId=${accountId}`, { timeout: 5000 });
            console.log("Response from API:", response);

            if (Array.isArray(response.data)) {
                setTasks(response.data); // Update tasks state
                console.log("Tasks set successfully:", response.data);
            } else {
                console.error("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false); // End loading state
            console.log("fetchTasks complete, loading set to false");
        }
    };

    const addTask = async (task) => {
        try {
            const accountId = localStorage.getItem('accountId');
            const response = await axios.post('http://localhost:8080/api/tasks', {
                ...task,
                account: { id: accountId }
            });
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Error adding task', error);
        }
    };

    const updateTask = async (task) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, task);
            setTasks((prevTasks) => prevTasks.map(t => (t.id === task.id ? response.data : t)));
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const openEditModal = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleModalSave = (task) => {
        if (currentTask) {
            updateTask(task);
        } else {
            addTask(task);
        }
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    if (loading) {
        return <div className="task-list-container"><p>Loading tasks...</p></div>; // Render loading message
    }

    return (
        <div className="task-list-container">
            <h2 className="task-list-title">Tasks</h2>
            <div className="add-task-container">
                <button className="add-task-button" onClick={() => {
                    setCurrentTask(null);
                    setIsModalOpen(true);
                }}>
                    <MdAddCircle /> Add New Task
                </button>
            </div>
            <ul className="task-list">
                {tasks.length === 0 ? (
                    <p>No tasks available.</p>
                ) : (
                    tasks.map((task) => (
                        <li key={task.id} className="task-item">
                            <div className="task-actions">
                                <MdEdit 
                                    className="task-icon" 
                                    onClick={() => openEditModal(task)} 
                                />
                                <MdDelete 
                                    className="task-icon" 
                                    onClick={() => deleteTask(task.id)} 
                                />
                            </div>
                            <div className="task-title">{task.title}</div>
                            <div className="task-description">{task.description}</div>
                            <div className="task-status">Status: {task.status}</div>
                            <div className="task-due-date">Due: {task.dueDate}</div>
                        </li>
                    ))
                )}
            </ul>
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
