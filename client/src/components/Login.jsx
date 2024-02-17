import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {

  const [Uemail, setEmail] = useState("");
  const [Upassword, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    const response = await fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: Uemail,
        password: Upassword
      })
    })

    const status = response.status;
    const json = await response.json();
    if(status === 200){
      console.log("login success");
    }
    else{
      console.log("incorrect login credentials");
    }

  }

  return(
    <div className="login">
      <h1>Login</h1>

      <form className="lcontainer">
      <label className="l">
        <p>Username</p>
        <input className="linp" type="text" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="l">
        <p>Password</p>
        <input className="linp" type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div>
        <button className="lb"type="submit" onClick={submit}>Submit</button>
      </div>
    </form>
    </div>
  )
}

export default Login;
