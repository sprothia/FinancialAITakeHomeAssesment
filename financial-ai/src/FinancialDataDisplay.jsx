// src/FinancialDataDisplay.js
import React from 'react';
import Tile from './tile';

const FinancialDataDisplay = ({ financialDataJSON, typeOfStatement }) => {
    
    const financialData = JSON.parse(financialDataJSON);
    console.log(`Parsed financial data ${financialData}`)
    const { financial_metrics, Insights } = financialData;

    const createMetricTiles = (metricData) => {

        return Object.entries(metricData).map(([key, value]) => {
            if (typeof value === 'object') {
                return createMetricTiles(value);
            }
            return <Tile key={key} title={key} value={value} />;
        });
    };

    const financialMetricTiles = financial_metrics ? Object.entries(financial_metrics).map(([key, value]) => (
        <Tile key={key} title={key.replace(/_/g, ' ').toUpperCase()} value={`$${value.toLocaleString()}`} />
    )) : null;

    return (

        <div style={{}}>
            <div style={{
                display: 'flex',
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '150px',
                marginBottom: '350px',

            }}>
                {financialMetricTiles}
            </div>
            
            <div style={{
                    color: 'black',
                    marginLeft: '105px',
                    marginTop: '-280px', 
                    fontSize: '14px', 
                    backgroundColor: '#f2f2f2',
                    padding: '20px', 
                    border: '6px solid #d9d9d9', 
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    borderRadius: '30px',
            }}>
                <h1>Insights</h1>
                <ul>
                    {Insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FinancialDataDisplay;
