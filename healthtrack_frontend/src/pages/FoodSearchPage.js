import React from 'react';
import SearchComponent from './components/SearchComponent';
import './FoodSearchPage.css';

function FoodSearchPage({ onTabChange }) {
    return (
        <div className="food-search-container">
            <div className="search-content">
                <SearchComponent onFoodSelect={onTabChange} />
            </div>
        </div>
    );
}

export default FoodSearchPage;