import React, { useState } from 'react';
import './Home.css';

const Home = () => {

  const [score, setScore] = useState(0);


  return(
    <>
      <nav>
        <div className="logo">ATS</div>
        <div className="nav-items">
          <a href="/">Home</a> <a href="/signup">Sign Up</a> <a href="/login">Log In</a>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-container">
          <div className="column-left">
            <h1>Send Unlimited Messages</h1>  
            <p>
              No contracts or unwanted fees. Exclusive offer for new customers
              only.
            </p>
            <button>Get Started</button>
          </div>
          <div className="column-right">
            {/* <img
              src=""
              alt="illustration"
              className="hero-image"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};


export default Home;
