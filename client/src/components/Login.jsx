import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [User, setUser] = useState("");
  const [Pass, setPass] = useState("");
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
      }),
    })

    if(response.status == 200){
      if(response.body.type=="recruiter"){
        nav('/Company')
      }
      else{
        nav('/applicant')
      }
    }
  }




  return(
    <div>
      <h1>Login</h1>

      <form>    
      <label>
        <p>Username / Company name</p>
        <input type="text" onChange={(e) => setUser(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password"  onChange={(e) => setPass(e.target.value)}/>
      </label>
      <div>
      <button type="button" onClick={submit}>Login</button>
      </div>
    </form>
    </div>
  )
}

export default Login;
