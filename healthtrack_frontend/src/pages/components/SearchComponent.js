import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import './SearchComponent.css';
import DualRangeSlider from "./DualRangeSlider";
import { FaCartArrowDown } from "react-icons/fa";

import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function SearchComponent({ onFoodSelect }) {
    const [keyword, setKeyword] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [metric, setMetric] = useState('');
    const [results, setResults] = useState([]);
    const [minAmount, setMinAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(100);

    const [showAddToCart, setShowAddToCart] = useState({});
    const [storeTime, setStoreTime] = useState({});
    const [amount, setAmount] = useState({});

    const categoriesList = [
        "Select All Categories",
        "Dairy and Egg Products", "Spices and Herbs", "Fats and Oils",
        "Poultry Products", "Soups, Sauces, and Gravies", "Sausages and Luncheon Meats",
        "Fruits and Fruit Juices", "Pork Products",
        "Vegetables and Vegetable Products", "Nut and Seed Products", "Beef Products",
        "Beverages", "Finfish and Shellfish Products", "Legumes and Legume Products",
        "Baked Products", "Sweets",
        "Cereal Grains and Pasta",
        "Restaurant Foods"
    ];

    const metricsList = [
        "No Nutrient Filtering", "Energy (kcal/100g food)",
        "Protein (g/100g food)", "Fat (g/100g food)",
        "Carbohydrate (g/100g food)"
    ];

    const metricMappings = {
        "No Nutrient Filtering": "No Nutrient Filtering",
        "Energy (kcal/100g food)": "Energy (Atwater General Factors)",
        "Protein (g/100g food)": "Protein",
        "Fat (g/100g food)": "Total fat (NLEA)",
        "Carbohydrate (g/100g food)": "Carbohydrate, by difference"
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleCategoryChange = (category) => {
        setCategoryName(category);
    };

    const handleMetricChange = (metric) => {
        setMetric(metricMappings[metric] || metric);
    };

    const handleRangeChange = ([min, max]) => {
        setMinAmount(min);
        setMaxAmount(max);
    };

    const searchFoods = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/foods/search', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    keyword: keyword,
                    categoryName: categoryName,
                    metric: metric,
                    minAmount: minAmount,
                    maxAmount: maxAmount
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error during data fetch:', error);
        }
    };

    const handleFoodClick = async (food) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/foods/${food.fdcId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Data to pass:", response.data);
            onFoodSelect('NutrientDetail', response.data);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleAddToCart = (fdcId) => {
        setShowAddToCart(prev => ({ ...prev, [fdcId]: !prev[fdcId] }));
    };

    const handleDateChange = (fdcId, value) => {
        setStoreTime(prev => ({ ...prev, [fdcId]: value }));
    };

    const handleAmountChange = (fdcId, value) => {
        setAmount(prev => ({ ...prev, [fdcId]: value }));
    };


    const addToCart = (food) => {
        const time = new Date(storeTime[food.fdcId]);
        const intakeAmount = parseInt(amount[food.fdcId], 10);

        if (!isNaN(time.getTime()) && intakeAmount > 0) {
            const cartData = {
                fdcId: food.fdcId,
                foodName: food.foodName,
                categoryName: food.categoryName,
                storeTime: time.toISOString(),
                intakeAmount: intakeAmount
            };

            const existingData = JSON.parse(localStorage.getItem('foodCart')) || [];

            localStorage.setItem('foodCart', JSON.stringify([...existingData, cartData]));

            toggleAddToCart(food.fdcId);
        } else {
            console.error('Invalid data: Store time is invalid or intake amount is not positive');
        }
    };


    return (
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="Enter food keyword"
            />
            <div className="category-dropdown-container">
                <Dropdown
                    options={categoriesList}
                    onChange={handleCategoryChange}
                    selected={categoryName}
                    placeholder="Select a food category"
                />
            </div>
            <div className="nutrient-dropdown-container">
                <Dropdown options={metricsList}
                          onChange={handleMetricChange}
                          selected={metric}
                          placeholder={"Select a nutrient metric"}
                />
                <DualRangeSlider
                        max={metric === "Energy (Atwater General Factors)" ? 1000 : 100}
                        onChange={handleRangeChange}
                />
            </div>
            <button className="search-button" onClick={searchFoods}>Search</button>
            <div className="results-container">
                {results.map((food, index) => (
                    <div key={index} className="food-item">
                        {!showAddToCart[food.fdcId] ? (
                            <div>{food.foodName}</div>
                        ) : (
                            <div className="add-to-cart-form">
                                <input type="datetime-local" onChange={(e) => handleDateChange(food.fdcId, e.target.value)} className="compact-input" />
                                <input type="number"
                                       placeholder="Amount (g)"
                                       step="1"
                                       onKeyDown={(e) => {
                                           // Prevent '.' character in number fields
                                           if (e.key === '.' || e.key === '+' || e.key === '-') {
                                               e.preventDefault();
                                           }
                                       }}
                                       onChange={(e) => handleAmountChange(food.fdcId, e.target.value)} className="compact-input" />
                            </div>
                        )}
                        <div className="icons-container">
                            {showAddToCart[food.fdcId] && (
                                <FaCartArrowDown onClick={() => addToCart(food)} />
                            )}
                            <FaSearch onClick={() => handleFoodClick(food)} />
                            <FaShoppingCart onClick={() => toggleAddToCart(food.fdcId)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchComponent;