import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import './UserNutriTrackPage.css';

function UserNutriTrackPage({ onTabChange }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8080/api/nutrient-track/list', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCartItems(response.data || []);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (itemToDelete) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/api/nutrient-track/delete', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    fdcId: itemToDelete.fdcId,
                    storeTime: itemToDelete.storeTime
                }
            });

            if (response.status === 200) {
                // Filter out the item from the local state to update the UI
                const updatedItems = cartItems.filter(item => item.fdcId !== itemToDelete.fdcId || item.storeTime !== itemToDelete.storeTime);
                setCartItems(updatedItems);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    return (
        <div className="food-cart-container">
            <div className="food-header">
                <h1 className="cart-name">Intake History</h1>
                <h2 className="delete-note">Double click on the trash icon to delete the history item</h2>
            </div>
            <div className="food-cart-cards">
                {cartItems.map((item) => (
                    <div key={item.fdcId + item.storeTime} className="food-cart-card">
                        <h3 className="cart-food-name">{item.foodName}</h3>
                        <p className="food-add-info">{item.categoryName}</p>
                        <p className="food-add-info">{item.intakeAmount}g</p>
                        <p className="food-add-info">{new Date(item.storeTime).toLocaleString()}</p>
                        <div className="delete-button-container">
                            <FaTrashAlt onDoubleClick={() => handleDelete(item)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserNutriTrackPage;