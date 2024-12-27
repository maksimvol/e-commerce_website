import React from 'react';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Page Not Found</p>
            <a href="/home">Go Back Home</a>
        </div>
    );
};

export default NotFound;
