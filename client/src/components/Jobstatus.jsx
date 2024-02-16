import React, { useState } from 'react';

const Jobstatus = () => {
  const [data, setData] = useState([
    {  name: 'vansh', mail:"Vanshjangir@gamil.com",score:"99%",  },
    {  name: 'harshit', mail:"harshit@gamil.com",score:"65%",  },
    {  name: 'devansh', mail:"devansh@gamil.com",score:"92%",  },
    
  ]);



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
