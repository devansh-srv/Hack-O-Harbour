import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
  
  const [Semail, setEmail] = useState("");
  const [Spassword, setPassword] = useState("");
  const [SUsername, setUsername] = useState("");
  const [SType, setType] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    const response = await fetch('http://localhost:3000/signup', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        email: Semail,
        password: Spassword,
        username: SUsername,
        type: SType
      }),
    })

    if(response.status == 200){
      if(SType === 'applicant'){
        localStorage.setItem('applicant', JSON.stringify(Semail));
        nav('/applicant')
      }else{
        localStorage.setItem('Company', JSON.stringify(Semail));
        localStorage.setItem('CompanyName', JSON.stringify(SUsername));
        nav('/company')
      }
    }
  }

  return(
    <div className="signup">
      <h1>SignUp</h1>
      <label className="sl">
        <p>Username</p>
        <input className="binp" type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="sl">
        <p>Password</p>
        <input className="binp"type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className="sl">
        <p>Email</p>
        <input className="binp" type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="sl">
        <p>Signup as a :</p> 
        <select className="ss" name="mode" id="mode" onChange={(e) => setType(e.target.value)}>
          <option value="none">none</option>
          <option value="company">company</option>
          <option value="applicant">applicant</option>
        </select>
      </label>
      <div >
        <button className="sb" type="submit" onClick={submit}>Submit</button>
      </div>
    </div>
  )
}

export default Signup;
