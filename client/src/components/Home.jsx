import React, { useState } from 'react';


const Home = () => {

  const [score, setScore] = useState(0);


  return(
    <div className="App">
    <form>
      <h1>React File Upload</h1>
      <input type="file" />
      <button type="submit">Upload</button>
    </form>

    <div>
      score = {score}
    </div>
  </div>
  )
}

export default Home;
