const Signup = () => {
  return(
    <div>
      <h1>SignUp</h1>
      <form>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <label>
        <p>Email</p>
        <input type="email" />
      </label>
      <label for="mode">
        <p>Signup as a :</p> 
        <select name="mode" id="mode">
          <option value="recruiter">recruiter</option>
          <option value="applicant">applicant</option>
        </select>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  )
}

export default Signup;
