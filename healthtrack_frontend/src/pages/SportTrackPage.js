import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SportTrackPage.css';
import { startOfDay, endOfDay } from 'date-fns';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
function SportTrackPage() {
    const formatDateForInput = (date) => {
        return `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}`;
    };

    const initialStart = startOfDay(new Date());
    const initialEnd = endOfDay(new Date());

    const [startDate, setStartDate] = useState(initialStart);
    const [endDate, setEndDate] = useState(initialEnd);
    const [startInputValue, setStartInputValue] = useState(formatDateForInput(initialStart));
    const [endInputValue, setEndInputValue] = useState(formatDateForInput(initialEnd));
    const [caloriesData, setCaloriesData] = useState(null);
    const [dailyCaloriesData, setDailyCaloriesData] = useState(null);

    const fetchCaloriesData = useCallback(async () => {
        const formattedStartDate = startDate.toISOString();
        const formattedEndDate = endDate.toISOString();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/sport-track/summary', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    startTime: formattedStartDate,
                    endTime: formattedEndDate
                }
            });

            setCaloriesData(response.data);


            const dailyResponse = await axios.get('http://localhost:8080/api/sport-track/daily-track', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    startTime: formattedStartDate,
                    endTime: formattedEndDate
                }
            });

            const processedData = dailyResponse.data.map(item => {
                return {
                    date: item.caloriesDate,
                    intake: item.totalIntake,
                    burn: item.totalBurn
                };
            });

            console.log('Data received:',processedData);
            setDailyCaloriesData(processedData);

        } catch (error) {
            console.error('Error fetching calories data:', error);
        }
    }, [startDate, endDate]);

    const handleDateChange = (input, setDate, setInputValue) => {
        const newDate = new Date(input);
        if (!isNaN(newDate.getTime())) {
            setDate(newDate);
            setInputValue(formatDateForInput(newDate));
        }
    };

    const renderCaloriesResults = () => {
        return caloriesData ? (
            <div className="calories-cards-container">
                <div className="calories-card" >
                    <div className="nutrition-metric">Average Daily Intake: </div>
                    <div className="nutrition-value">{caloriesData.avgIntake.toFixed(2)}</div>
                    <div className="nutrition-unit">KCAL </div>
                </div>
                <div className="calories-card" >
                    <div className="nutrition-metric">Average Daily Burned: </div>
                    <div className="nutrition-value">{caloriesData.avgBurn.toFixed(2)}</div>
                    <div className="nutrition-unit">KCAL </div>
                </div>
            </div>
        ) : null;
    };

    const getChartData = (dailyCaloriesData) => ({
        labels: dailyCaloriesData.map(data => data.date),
        datasets: [
            {
                label: 'Total Intake',
                data: dailyCaloriesData.map(data => data.intake),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.8)',
                yAxisID: 'y',
            },
            {
                label: 'Total Burn',
                data: dailyCaloriesData.map(data => data.burn),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.8)',
                yAxisID: 'y',
            }
        ]
    });

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        family: 'Nunito Sans',
                    }
                },
                autoSkip: true,
            },
            x: {
                ticks: {
                    font: {
                        family: 'Nunito Sans',
                    }
                },
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 12,
                        family: 'Nunito Sans'
                    },
                    boxWidth: 10,
                    boxHeight: 5
                }
            },
            tooltip: {
                bodyFont: {
                    family: 'Nunito Sans',
                },
                titleFont: {
                    family: 'Nunito Sans',
                },
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}`;
                    }
                }
            }
        },
        responsive: true,
    };

    const renderLineChart = () => {
        if (!dailyCaloriesData || dailyCaloriesData.length === 0) {
            return null;
        }
        return (
            <div className="line-chart-container">
                <Line data={getChartData(dailyCaloriesData)} options={chartOptions} />
            </div>
        );
    };


    return (
        <div className="sport-track-container">
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
            <button className="submit-button" onClick={fetchCaloriesData}>
                See your calories summary for this period
            </button>
            {/*{renderCaloriesResults()}*/}
            <div className="sport-track-data-container">
                {renderCaloriesResults()}
                {renderLineChart()}
            </div>
        </div>
    );
}

export default SportTrackPage;