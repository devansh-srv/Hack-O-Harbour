import { useState } from "react";
import { useNavigate } from "react-router-dom";
//  import './Createjob.css';
import ComNavbar from './ComNavbar'
const Createjob = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [jobID, setID] = useState("");
  const company = JSON.parse(localStorage.getItem('CompanyName'));

  const submit = async () => {
    const response = await fetch('http://localhost:3000/createjob', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: jobID,
        Company: company,
        title: title,
        description: desc
      })
    })

    const status = response.status;
    if(status === 200){
      console.log("success");
    }
    else{
      console.log("failure");
    }
  }

  return(
    <>
    <ComNavbar/>
    <div className="signup">
    <div className="scontainer">
      <h1>Create a Job</h1>

      <form>
      <label className="sl">
        <p>Enter a Title</p>
        <input  className="binp"type="text" onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="sl">
        <p>Enter ID</p>
        <input className="binp" type="text" onChange={(e) => setID(e.target.value)} />
      </label>
      <label>
        <p>job description </p>
        <input className="binp" type="text" onChange={(e) => setDesc(e.target.value)} />
      </label>
      <div>
        <button className="sb" type="submit" onClick={submit}>Submit</button>
      </div>
    </form>
    </div>
    </div>
    </>
  )
}

export default Createjob;
