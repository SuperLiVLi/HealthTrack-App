import React, { useState } from 'react';
import axios from 'axios';
import DualRangeSlider from './components/DualRangeSlider';
import './SportSearchPage.css';
import { FaCartArrowDown, FaShoppingCart } from "react-icons/fa";

function SportSearchPage() {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [minCalories, setMinCalories] = useState(0);
    const [maxCalories, setMaxCalories] = useState(100);

    const [showAddToCart, setShowAddToCart] = useState({});
    const [startTime, setStartTime] = useState({});
    const [endTime, setEndTime] = useState({});

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleRangeChange = ([min, max]) => {
        setMinCalories(min);
        setMaxCalories(max);
    };

    const searchSports = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/sports/search', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    keyword: keyword,
                    minAmount: minCalories,
                    maxAmount: maxCalories
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error during data fetch:', error);
        }
    };

    const toggleAddToCart = (sportId) => {
        setShowAddToCart(prev => ({ ...prev, [sportId]: !prev[sportId] }));
    };

    const handleStartTimeChange = (sportId, value) => {
        setStartTime(prev => ({ ...prev, [sportId]: value }));
    };

    const handleEndTimeChange = (sportId, value) => {
        setEndTime(prev => ({ ...prev, [sportId]: value }));
    };

    const addToCart = (sport) => {
        const start = new Date(startTime[sport.sportId]);
        const end = new Date(endTime[sport.sportId]);

        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
            const cartData = {
                sportId: sport.sportId,
                sportName: sport.sportName,
                caloriesPerKg: sport.caloriesPerKg,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
            };

            const existingData = JSON.parse(localStorage.getItem('sportCart')) || [];
            localStorage.setItem('sportCart', JSON.stringify([...existingData, cartData]));

            toggleAddToCart(sport.sportId);
        } else {
            console.error('Invalid data: Start time is invalid or duration is not positive');
        }
    };

    return (
        <div className="sport-search-container">
            <input
                className="sport-search-input"
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="Enter sport keyword & Select range of calorie burnt below"
            />
            <div className="sport-slider-container">
                <DualRangeSlider
                    max={5} // Assuming the maximum calorie burn could be higher
                    onChange={handleRangeChange}
                />
            </div>
            <button className='sport-search-button' onClick={searchSports}>Search</button>
            <div className="sport-results-container">
                {results.map((sport, index) => (
                    <div key={index} className="sport-item">
                        {!showAddToCart[sport.sportId] ? (
                            <div>
                                <div className="sport-name">{sport.sportName}</div>
                                <div className="sport-calories">{parseFloat(sport.caloriesPerKg).toFixed(2)} Cal/kg/h</div>
                            </div>
                        ) : (
                            <div className="add-to-cart-form">
                                <input type="datetime-local" onChange={(e) => handleStartTimeChange(sport.sportId, e.target.value)} className="compact-input" />
                                <input type="datetime-local" onChange={(e) => handleEndTimeChange(sport.sportId, e.target.value)} className="compact-input" />
                            </div>
                        )}
                        <div className="icons-container">
                            {showAddToCart[sport.sportId] && (
                                <FaCartArrowDown onClick={() => addToCart(sport)} />
                            )}
                            <FaShoppingCart onClick={() => toggleAddToCart(sport.sportId)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SportSearchPage;