import React, { useState } from 'react';
import '../styles/EnterPage.css'
import backgroundImage from '../images/lake_como.jpg'

const EnterPage = ({ onNavigate }) => {

    return (
        <div className='container' style={{ 
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover"
            }}>
            <span onClick={() => onNavigate('/home')}>
                ENTER
            </span>
        </div>
    );
}

export default EnterPage;
