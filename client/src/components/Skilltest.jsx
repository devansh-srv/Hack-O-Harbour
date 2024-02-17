import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Skilltest = () => {

  const [data, setData] = useState(
    [
      {
        question: "hello",
        no: 1,
        options: {
          a: "f",
          b: "t",
          c: "f",
          d: "t",
        },
        ans: 'a',
      }
    ]
  );

  const ansarr = [5];
  const getTest = async () => {
    const response = await fetch(`http://localhost:3000/gettest:${id}`, {
      method: "GET",
    });

    const json = response.json();
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
    <div className="skilltest">
      <h1>SkillTest</h1>
      <div >
        <ul>
          {data.map(item => (
            <div>
            <li key={item.question}>
              {item.no}{item.question}
              <p>a: {item.options.a}</p>
              <p>b: {item.options.b}</p>
              <p>c: {item.options.c}</p>
              <p>d: {item.options.d}</p>
            </li>
            <input type="text" onChange={(e)=>ansarr[int(item.no)-1] = e.target.value}></input>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Skilltest;
