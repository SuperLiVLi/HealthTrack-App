import React, { useState } from 'react';
import './SignupPage.css';
import { IoMdArrowRoundBack } from "react-icons/io";

function SignupPage({ setActiveTab }) {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ name: '', weight: '', email: '', password: '' });

    const checkSignup = (event) => {
        event.preventDefault();
        setErrors({ name: '', weight: '', email: '', password: '' });

        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, weight, email, password })
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('signupSuccess', 'true'); // Set flag for signup success
                setActiveTab('Login'); // Redirect to login
            })
            .catch(errorResponse => {
                errorResponse.json().then(errorData => {
                    setErrors(prev => ({
                        ...prev,
                        name: errorData.name || '',
                        email: errorData.email || '',
                        password: errorData.password || '',
                        weight: errorData.weight || ''
                    }));
                }).catch(() => {
                    setErrors(prev => ({
                        ...prev,
                        name: 'An unexpected error occurred',
                        email: '',
                        password: '',
                        weight: ''
                    }));
                });
            });
    };

    return (
        <div className='signup-page'>
            <div className="illustration-section">
            </div>

            <div className="signup-section">
                <form onSubmit={checkSignup}>
                    <div className="signup-container">
                        <h1 className="head">Sign up for HealthTrack</h1>
                        <p className="login-description">Please sign up your HealthTrack account!</p>

                        <h3 className="input_head">Name</h3>
                        <input className="input" type="text" placeholder="Please enter your name" value={name} onChange={e => setName(e.target.value)} />
                        {errors.name && <p className="error">{errors.name}</p>}

                        <h3 className="input_head">Weight (kg)</h3>
                        <input className="input" type="number" placeholder="Please enter your weight" value={weight} onChange={e => setWeight(e.target.value)} />
                        {errors.weight && <p className="error">{errors.weight}</p>}

                        <h3 className="input_head">Email</h3>
                        <input className="input" type="email" placeholder="Please enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                        {errors.email && <p className="error">{errors.email}</p>}

                        <h3 className="input_head">Password</h3>
                        <input className="input" type="password" placeholder="Please enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                        {errors.password && <p className="error">{errors.password}</p>}

                        <button className="submit_button" type="submit">Complete</button>

                        <div className="back-to-login-prompt">
                            <span onClick={() => setActiveTab('Login')}>
                                <IoMdArrowRoundBack style={{ marginRight: '2px', verticalAlign: 'middle' }} />Back to login page
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;

