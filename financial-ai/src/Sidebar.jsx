import React from 'react';
import './Sidebar.css';


const Sidebar = () => {
    return (
        <div className="sidebar">

            <h2 className="sidebar-title"> SALTWATER</h2>
            <button className="sidebar-button">  Timeline</button>
            <button className="sidebar-button"> Portfolio</button>
            <button className="sidebar-button"> Deals</button>
            <button className="sidebar-button"> Funds</button>
            <button className="sidebar-button"> LPs</button>

        </div>
    );
}

export default Sidebar;