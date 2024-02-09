import React from 'react';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{
        border: '5px solid #f3f3f3', 
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 2s linear infinite'
      }} />
    </div>
  );
}

export default Spinner;
