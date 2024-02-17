import { useState } from "react";

const Login = () => {

  const [Uemail, setEmail] = useState("");
  const [Upassword, setPassword] = useState("");

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
      if(json.type == 'company'){
        localStorage.setItem('Company', JSON.stringify(json.email));
      }else{
        localStorage.setItem('applicant', JSON.stringify(json.email));
      }
    }
    else{
      console.log("incorrect login credentials");
    }

  }

  return(
    <div>
      <h1>Login</h1>
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
    </div>
  )
}

export default Login;
