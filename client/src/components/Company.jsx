import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import './Company.css';
import ComNavbar from './ComNavbar'

const Company = () => {

  const [data, setData] = useState([]);
  const nav = useNavigate();
  const name = JSON.parse(localStorage.getItem('CompanyName'));
  const getJobs = async () => {
    const response = await fetch(`http://localhost:3000/company:${name}`, {
      method: "GET",
    });

    const json = await response.json();
    if(response.status === 200){
      setData(json);
    }
  }

  const handle = (item) => {
    nav('/jobstatus', {id: item.ID});
  }

  useEffect(()=>{
    getJobs();
  },[]);

  return(
    <>
    <ComNavbar/>
    <div>
      <h1>Company</h1>
      <ul>
        {data.map(item => (
          <li key={item.company} onClick={()=>handle(item)}>
             {item.title}{item.company}{item.desc}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Company;
