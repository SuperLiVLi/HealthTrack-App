import React, { useState } from 'react';
import NavbarComponent from './pages/components/NavbarComponent';

import FoodSearchPage from './pages/FoodSearchPage';
import SportTrackPage from "./pages/SportTrackPage";
import SportSearchPage from "./pages/SportSearchPage";
import NutrientDetailPage from './pages/NutrientDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FoodCartPage from "./pages/FoodCartPage";
import SportCartPage from "./pages/SportCartPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NutriTrackPage from "./pages/NutriTrackPage";
import UserNutriTrackPage from "./pages/UserNutriTrackPage";

function App() {
    const [activeTab, setActiveTab] = useState('FoodSearch');
    const [nutrientDetails, setNutrientDetails] = useState(null);

    const handleSetActiveTab = (tab, details = null) => {
        setActiveTab(tab);
        setNutrientDetails(details);
    };



    return (
        <div className="App">
            <NavbarComponent activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="container mt-3">
                {activeTab === 'FoodSearch' && <FoodSearchPage onTabChange={handleSetActiveTab} />}
                {activeTab === 'NutriTrack' && <NutriTrackPage />}
                {activeTab === 'SportSearch' && <SportSearchPage />}
                {activeTab === 'SportTrack' && <SportTrackPage />}
                {activeTab === 'NutrientDetail' && <NutrientDetailPage nutrientDetails={nutrientDetails} onBack={handleSetActiveTab} />}
                {activeTab === 'Login' && <LoginPage setActiveTab={setActiveTab} />}
                {activeTab === 'Signup' && <SignupPage setActiveTab={setActiveTab}/>}
                {activeTab === 'FoodCart' && <FoodCartPage setActiveTab={setActiveTab}/>}
                {activeTab === 'SportCart' && <SportCartPage setActiveTab={setActiveTab}/>}
                {activeTab === 'UserNutriTrack' && <UserNutriTrackPage setActiveTab={setActiveTab}/>}
            </div>
        </div>
    );
}

export default App;