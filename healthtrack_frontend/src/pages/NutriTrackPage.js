import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './NutriTrackPage.css';
import { startOfDay, endOfDay } from 'date-fns';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function NutriTrackPage() {
    const formatDateForInput = (date) => {
        return `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}`;
    };

    const initialStart = startOfDay(new Date());
    const initialEnd = endOfDay(new Date());

    const [startDate, setStartDate] = useState(initialStart);
    const [endDate, setEndDate] = useState(initialEnd);
    const [startInputValue, setStartInputValue] = useState(formatDateForInput(initialStart));
    const [endInputValue, setEndInputValue] = useState(formatDateForInput(initialEnd));
    const [nutritionData, setNutritionData] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    const fetchNutritionData = useCallback(async () => {
        const metricMappings = {
            2047: "Energy",
            1003: "Protein",
            1004: "Fat",
            1005: "Carbohydrate"
        };

        const formattedStartDate = startDate.toISOString();
        const formattedEndDate = new Date(endDate.getTime() + (24 * 60 * 60 * 1000) - 1).toISOString();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/nutrient-track/summary`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    startTime: formattedStartDate,
                    endTime: formattedEndDate,
                    nutrientIds: Object.keys(metricMappings).join(',')
                }
            });

            const data = response.data.map(item => ({
                metric: metricMappings[item.nutrientId],
                amount: item.avgIntake,
                unitName: item.unitName
            }));

            setNutritionData(data);

            //
            const categoryResponse = await axios.get(`http://localhost:8080/api/nutrient-track/category-amount`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    startTime: formattedStartDate,
                    endTime: formattedEndDate,
                }
            });

            // console.log('API Response:', categoryResponse);
            // console.log('Data received:', categoryResponse.data);

            setCategoryData(categoryResponse.data.map(item => ({
                categoryName: item.categoryName,
                totalAmount: item.totalAmount
            })));
            //
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
        }
    }, [startDate, endDate]);

    const handleDateChange = (input, setDate, setInputValue) => {
        const newDate = new Date(input);
        if (!isNaN(newDate.getTime())) {
            setDate(newDate);
            setInputValue(formatDateForInput(newDate));
        }
    };

    const colors = [
        '#A3E7FC', // Light Blue
        '#B4F8C8', // Mint Green
        '#FBE7C6', // Peach
        '#E1FFC7', // Light Green
        '#FFD3B4', // Light Orange
        '#FFAAA5', // Soft Pink
        '#D5A6BD', // Dusty Rose
        '#9D96B8', // Soft Purple
        '#A4B0BE', // Grey Blue
        '#778CA3'  // Slate
    ];

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        let label = 'Intake Amount';
                        let value = tooltipItem.raw;
                        return `${label}: ${parseFloat(value).toFixed(2)}g`;
                    }
                },
                bodyFont: {
                    family: "'Nunito Sans', sans-serif",
                },
                titleFont: {
                    family: "'Nunito Sans', sans-serif",
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    const pieData = {
        labels: categoryData.map(data => data.categoryName),
        datasets: [{
            label: 'Category Intake Amount',
            data: categoryData.map(data => data.totalAmount),
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    };

    const renderNutritionCards = () => {
        return nutritionData ? (
            <div className="nutrition-cards-container">
                {nutritionData.map((data, index) => (
                    <div className="nutrition-card" key={index}>
                        <div className="nutrition-metric">Average Daily {data.metric}</div>
                        <div className="nutrition-value">{data.amount.toFixed(2)}</div>
                        <div className="nutrition-unit">{data.unitName}</div>
                    </div>
                ))}
            </div>
        ) : null;
    };

    return (
        <div className="nutri-track-container">
            <div className="date-picker-container">
                <div className="date-picker">
                    <label>Start Date</label>
                    <input
                        type="text"
                        value={startInputValue}
                        className="start-date-input"
                        onChange={(e) => setStartInputValue(e.target.value)}
                        onBlur={() => handleDateChange(startInputValue, setStartDate, setStartInputValue)}
                    />
                    <Calendar
                        onChange={(date) => handleDateChange(formatDateForInput(date), setStartDate, setStartInputValue)}
                        value={startDate}
                        maxDate={endDate}
                    />
                </div>
                <div className="date-picker">
                    <label>End Date</label>
                    <input
                        type="text"
                        value={endInputValue}
                        className="end-date-input"
                        onChange={(e) => setEndInputValue(e.target.value)}
                        onBlur={() => handleDateChange(endInputValue, setEndDate, setEndInputValue)}
                    />
                    <Calendar
                        onChange={(date) => handleDateChange(formatDateForInput(date), setEndDate, setEndInputValue)}
                        value={endDate}
                        minDate={startDate}
                        maxDate={new Date()}
                    />
                </div>
            </div>
            <button className="submit-button" onClick={fetchNutritionData}>
                See your intake summary for this period
            </button>
            <div className="nutri-track-data-container">
                {renderNutritionCards()}
                <div className="pie-chart-container">
                    <Pie data={pieData} options={options} />
                </div>
            </div>
        </div>
    );
}

export default NutriTrackPage;




