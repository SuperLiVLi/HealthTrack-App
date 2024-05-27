import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SportCartPage.css';  // Rename CSS file accordingly
import { FaTrashAlt } from "react-icons/fa";

function SportCartPage({ onTabChange }) {
    const [cartItems, setCartItems] = useState([]);
    const [submitResponse, setSubmitResponse] = useState('');

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('sportCart'));
        if (storedItems) {
            setCartItems(storedItems);
        }
    }, []);

    const handleDelete = (itemToDelete) => {
        // Adjust filtering to handle sport item properties
        const updatedItems = cartItems.filter(item => item.sportId !== itemToDelete.sportId || item.startTime !== itemToDelete.startTime);
        setCartItems(updatedItems);
        localStorage.setItem('sportCart', JSON.stringify(updatedItems));
    };

    const handleSubmit = async () => {
        // Adjust payload structure for sport items
        const transformedData = cartItems.map(({ sportId, startTime, endTime }) => ({ sportId, startTime, endTime }));

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8080/api/sports/add', transformedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setSubmitResponse(response.data);
            if (response.status === 200) {
                localStorage.removeItem('sportCart');
                setCartItems([]);
            }
        } catch (error) {
            setSubmitResponse(error.response.data);
        }
    };

    return (
        <div className="sport-cart-container">
            <div className="food-header">
                <h1 className="cart-name">Sport Cart</h1>
            </div>
            <div className="food-cart-cards">
                {cartItems.map((item) => (
                    <div key={item.sportId + item.startTime} className="sport-cart-card">
                        <h3 className="cart-sport-name">{item.sportName}</h3>
                        <p className="sport-add-info">Calories burned /kg/h: {item.caloriesPerKg}</p>
                        <p className="sport-add-info">Start Time: {new Date(item.startTime).toLocaleString()}</p>
                        <p className="sport-add-info">End Time: {new Date(item.endTime).toLocaleString()}</p>
                        <div className="delete-button-container">
                            <FaTrashAlt onClick={() => handleDelete(item)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-submit-button-container">
                <button className="cart-submit-button" onClick={handleSubmit}>Submit Cart</button>
            </div>
            {submitResponse && <div className="cart-message">{submitResponse}</div>}
        </div>
    );
}

export default SportCartPage;
