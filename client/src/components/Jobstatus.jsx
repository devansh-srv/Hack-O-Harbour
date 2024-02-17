import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Jobstatus = () => {
  const [data, setData] = useState([]);

  const {id} = useLocation();
  const getData = async () => {
    const response = await fetch(`http://localhost:3000/jobstatus:${id}`, {
      method: "GET",
    });

    const json = await response.json();
    if(response.status === 200){
      setData(json);
    }
  }

  useEffect(()=>{
    getData();
  },[]);


  // data=data.sort((a, b) => a.score - b.score);
  return(
    <div>
      <h1>Applicants </h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}  {item.mail}  {item.score} 
            <button>resume</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Jobstatus;
