import React, { useState } from 'react';
import './Navbar.css';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">This is Nav Bar</a>
            </div>
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={30} /> : <Menu size={30} />}
            </div>
            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <li><a href="/" className="active">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;