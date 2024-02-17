import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import './Company.css';
import ComNavbar from './ComNavbar'
const Createjob = () => {
  return(
    <>
    <ComNavbar/>
    <div>
      <h1>Create a Job</h1>

      <form>
      <label>
        <p>Enter a Title</p>
        <input type="text" />
      </label>
      <label>
        <p>job description </p>
        <input type="text" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
    </>
  )
}

export default Createjob;
