import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      nav(-1);
    }
  }

  return(
    <div>
      <h1>SignUp</h1>
      <form>
      <label>
        <p>Username</p>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        <p>Email</p>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Signup as a :</p> 
        <select name="mode" id="mode" onChange={(e) => setType(e.target.value)}>
          <option value="none">none</option>
          <option value="recruiter">recruiter</option>
          <option value="applicant">applicant</option>
        </select>
      </label>
      <div>
        <button type="submit" onClick={submit}>Submit</button>
      </div>
    </form>
    </div>
  )
}

export default Signup;
