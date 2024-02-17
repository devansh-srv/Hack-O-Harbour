import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Login</h1>

      <form>
      <label>
        <p>Username</p>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div>
        <button type="submit" onClick={submit}>Submit</button>
      </div>
    </form>
    </div>
  )
}

export default Login;
