import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Skilltest.css';
import Navbar from './Navbar'
const Skilltest = () => {

  const [data, setData] = useState(
    [
    ]
  );

  const ansarr = [5];
  const getTest = async () => {
    const response = await fetch(`http://localhost:3000/gettest:googlebackend`, {
      method: "GET",
    });

    const json = await response.json();
    if(response.status === 200){
      setData(json);
    }
  }
  
  const sendAns = async () => {
    const response = await fetch(`http://localhost:3000/testresult:${id}`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(
        {
          ans: ansarr,
          id: id,
        }
      ),
    });

    const json = response.json();
    if(response.status === 200){
      setData(json);
    }
  }

  useEffect(()=>{
    getTest();
  },[])

  return(
    <>    
    <Navbar/>
    <div className="skilltest">
      <h1>SkillTest</h1>
      <div className="test">
        <ul className="list">
          {data.map(item => (
            <>
            <div>
            <li key={item.question}>
              {item.no}{item.question}  
              <p>a: {item.options.a}</p>
              <p>b: {item.options.b}</p>
              <p>c: {item.options.c}</p>
              <p>d: {item.options.d}</p>
            </li>
            </div>
            <input type="text" onChange={(e)=>ansarr[int(item.no)-1] = e.target.value}></input>
            </>
          ))}
        </ul>
      </div>
    </div>
    </>

  )
}

export default Skilltest;
