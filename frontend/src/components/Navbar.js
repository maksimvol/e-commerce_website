import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleMouseEnter = () => {
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setMenuOpen(false);
    };

    return (
        <div>
            <div className="navbar">
            <div className="navbar-left">
                <div
                    className="hamburger-menu"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="hamburger-icon">☰</span>
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <Link to="/home">All Products</Link>
                            {categories.map((category, index) => (
                                    <Link key={index} to={`/home?filter=${category.name}`}>
                                        {category.name}
                                    </Link>
                                ))}
                        </div>
                    )}
                </div>

                <div className='navbar-links'>
                    <Link to="/home">Home Page</Link>
                    <Link to="/admin/add-product">Add Product</Link>
                </div>
            </div>

                <div className='navbar-links'>
                    <div className="navbar-right">
                        <Link to="/bag" className="shopping-bag">Shopping Bag</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;