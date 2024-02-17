import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'


const Jobs = () => {
  const [data, setData] = useState([]);
  const [jobdata, setJobData] = useState({});

  const getJobs = async () => {
    const response = await fetch("http://localhost:3000/jobs", {
      method: "GET",
    });

    const json = await response.json();
    if(response.status === 200){
      setData(json);
    }
  }

  const apply = async (item) => {
    setJobData(item);
    applysend();
  }

  const applysend = async () => {
    const response = await fetch('http://localhost:3000/applyjob', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(
        {
          job: jobdata,
          email: JSON.parse(localStorage.getItem('applicant')),
        }
      ),
    });

    if(response.status === 200){
      console.log("done");
    }else{
      console.log("undone");
    }
  }

  useEffect(()=>{
    getJobs();
  },[])

  return(
  <div>
    <Navbar/>
    <h1>Jobs </h1>
    <ul>
      {data.map(item => (
        <li key={item.company} onClick={()=>apply(item)}>
           {item.title}{item.company}{item.desc}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Jobs;
