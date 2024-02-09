import React from 'react';

const Tile = ({ title, value }) => {
  return (
    <div style={{
        width: '200px', // Fixed width
        height: '150px', // Fixed height
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        textAlign: 'center',
        backgroundColor: '#e8e8e8', // Changed background color
        color: '#333', // Changed text color
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden' // Added to handle overflowing content
      }}>
        <h2 style={{
          fontWeight: 'bold',
          marginBottom: '10px',
          fontSize: '1em', // Adjust font size
          overflow: 'hidden', // Prevent overflow
          textOverflow: 'ellipsis', // Add ellipsis for long text
          whiteSpace: 'nowrap' // Keep the title in a single line
        }}>
          {title}
        </h2>
        <p>{value}</p>
      </div>
  );
};

export default Tile;