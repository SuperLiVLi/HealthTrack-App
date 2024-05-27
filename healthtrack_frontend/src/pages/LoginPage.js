import React, { useState, useEffect } from 'react';
import './LoginPage.css';

function LoginPage({ setActiveTab }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const signupSuccess = localStorage.getItem('signupSuccess');
        if (signupSuccess) {
            setLoginMessage('You have successfully signed up!');
            localStorage.removeItem('signupSuccess');
        }
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        setLoginError('');

        fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('User does not exist or password is incorrect');
                }
                return response.json();
            })
            .then(data => {
                localStorage.clear();
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.name);
                setActiveTab('FoodSearch');
            })
            .catch(error => {
                setLoginError(error.message);
            });
    };

    return (
        <div className="login-page">
            <div className="illustration-section">
            </div>
            <div className="login-section">
                <div className="login-container">
                    <h1>Log in to HealthTrack</h1>
                    {loginMessage && <p className="login-success-message">{loginMessage}</p>}
                    <p className="login-description">Please log in and start your health journey!</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {loginError && <p className="login-error">{loginError}</p>}
                    <button onClick={handleLogin}>LOG IN</button>
                    <div className="signup-prompt">
                        New on HealthTrack?
                        <span onClick={() => setActiveTab('Signup')}> Create an account</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;