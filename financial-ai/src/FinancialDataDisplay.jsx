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
                marginLeft: '150px'
            }}>
                {financialMetricTiles}
            </div>
            
            <div style={{ marginBottom: '-380px', color: 'black', marginLeft: '50px',fontSize: '15px'}}>
                <h3>Insights</h3>
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
