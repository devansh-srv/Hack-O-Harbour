import React, { useState } from 'react';


const Home = () => {

  const [score, setScore] = useState(0);
  const handleFileUpload = async (e) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch('http://localhost:3000/uploadresume', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: formData,
    });

    if (response.status == 200) {
      console.log('File uploaded successfully');
    } else {
      console.error('Error uploading file:', response.statusText);
    }
  };


  return(
    <div className="App">
    <form>
      <h1>Upload Resume</h1>
      <input type="file" onChange={handleFileUpload}/>
      <button type="submit">Upload</button>
    </form>

    <div>
      score = {score}
    </div>
  </div>
  )
}

export default Home;
