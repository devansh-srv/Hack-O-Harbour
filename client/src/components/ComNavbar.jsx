import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const ComNavbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/company" className={location.pathname === '/company' ? 'active' : ''}>Jobs Created</Link>
      <Link to="/createjob" className={location.pathname === '/createjob' ? 'active' : ''}>New Job</Link>
    </nav>
  );
};

export default ComNavbar;