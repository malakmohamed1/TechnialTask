import React, { useState, useEffect } from 'react';
import '../styles/TaskModal.css'; // Ensure to add styles for the modal

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending', // Default status
        dueDate: '',
    });

    useEffect(() => {
        if (task) {
            setFormData(task); // Pre-fill the form if editing
        } else {
            setFormData({ title: '', description: '', status: 'Pending', dueDate: '' });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); 
        resetForm();
        // Pass the form data to the parent on save
    };
    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            status: 'Pending',
            dueDate: '',
        });
    };

    return (
        <div className={`task-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            className='input'
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            className='input'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            name="status"
                            className='input'
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label>Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            className='input'
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal-actions">
                        <button  className="modal-button"  type="submit">{task ? 'Update Task' : 'Add Task'}</button>
                        <button  className="modal-button" type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
