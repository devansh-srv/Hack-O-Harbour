import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/applicant" className={location.pathname === '/applicant' ? 'active' : ''}>Home</Link>
      <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>Jobs</Link>
    </nav>
  );
};

export default Navbar;