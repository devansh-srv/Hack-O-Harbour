import React, { useState } from 'react';


const Jobs = () => {
  const [data, setData] = useState([
      {  job: 'frontend' },
      {  job: 'backend' },
      {  job: 'problem setter' }
    ]);
  return(
  <div>
    <h1>Jobs </h1>
    <ul>
      {data.map(item => (
        <li key={item.id}>
           {item.job}
          <button>APPLY</button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Jobs;
