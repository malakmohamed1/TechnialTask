import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', { email, password });
            setMessage('Registration successful!');
            console.log("Registration successful!");
            navigate('/login');
        } catch (error) {
            setMessage('Error registering. Please try again.');
            console.log("Error registering. Please try again.!");
        }
    };

    return (
        <div className="login-container"> 
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Register;
