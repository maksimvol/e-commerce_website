import React from 'react';

import '../styles/Footer.css';

import InstagramLogo from "../images/instagram.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="footer-badge">
                    <span className="gift-icon">🎁</span>
                    <span>Get 10% off (Coming Soon)</span>
                </div>
            </div>

            <div className="footer-center">
                <div className="social-icons">
                    <a href="https://www.instagram.com/massyavv">
                        <img src={InstagramLogo} alt="Instagram" />
                    </a>
                </div>
                <p>©2024 by Maksims Volokotkins</p>
            </div>

            <div className="footer-right">
                <div className="footer-chat">
                    <span className="chat-icon">💬</span>
                    <span>Let's Chat! (Coming Soon)</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;