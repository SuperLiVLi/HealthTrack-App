import React from 'react';
import './NutrientDetailPage.css';


function NutrientDetailPage({ nutrientDetails, onBack }) {
    return (
        <div className="nutrient-detail-container">
            <div className="food-header">
                <h1 className="food-name">{nutrientDetails ? nutrientDetails[0].foodName : 'Loading...'}</h1>
                <h2 className="food-category">{nutrientDetails ? 'Category: ' + nutrientDetails[0].categoryName : ''}</h2>
            </div>
            <div className="nutrient-cards">
                {nutrientDetails ? nutrientDetails.map((nutrientDetail, index) => (
                    <div key={index} className="nutrient-card">
                        <div className="nutrient-name">{nutrientDetail.nutrientName}</div>
                        <div className="nutrient-amount-unit">{nutrientDetail.amount} {nutrientDetail.unitName}</div>
                    </div>
                )) : (
                    <p>Loading or no data available.</p>
                )}
            </div>
            <div className="button-container">
                <button onClick={() => onBack('FoodSearch')} className="back-to-search-btn">Back to Search</button>
            </div>
        </div>
    );
}

export default NutrientDetailPage;