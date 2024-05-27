import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodCartPage.css';
import { FaTrashAlt } from "react-icons/fa";

function FoodCartPage({ onTabChange }) {
    const [cartItems, setCartItems] = useState([]);
    const [submitResponse, setSubmitResponse] = useState('');

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('foodCart'));
        if (storedItems) {
            setCartItems(storedItems);
        }
    }, []);

    const handleDelete = (itemToDelete) => {
        const updatedItems = cartItems.filter(item => item.fdcId !== itemToDelete.fdcId || item.storeTime !== itemToDelete.storeTime);
        setCartItems(updatedItems);
        localStorage.setItem('foodCart', JSON.stringify(updatedItems));
    };

    const handleSubmit = async () => {
        const transformedData = cartItems.map(({ fdcId, storeTime, intakeAmount }) => ({ fdcId, storeTime, intakeAmount }));

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8080/api/foods/add', transformedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setSubmitResponse(response.data);
            if (response.status === 200) {
                localStorage.removeItem('foodCart'); // Clear only if successful
                setCartItems([]); // Also clear the cart items in state
            }
        } catch (error) {
            setSubmitResponse(error.response.data);
        }
    };

    return (
        <div className="food-cart-container">
            <div className="food-header">
                <h1 className="cart-name">Food Cart</h1>
            </div>
            <div className="food-cart-cards">
                {cartItems.map((item) => (
                    <div key={item.fdcId + item.storeTime} className="food-cart-card">
                        <h3 className="cart-food-name">{item.foodName}</h3>
                        <p className="food-add-info">{item.categoryName}</p>
                        <p className="food-add-info">{item.intakeAmount}g</p>
                        <p className="food-add-info">{new Date(item.storeTime).toLocaleString()}</p>
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

export default FoodCartPage;
