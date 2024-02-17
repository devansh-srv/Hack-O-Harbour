import React, { useState } from 'react';

const Home = () => {

  const [score, setScore] = useState(0);
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  }

  const fileUpload = async () => {
    
    const storeEmail = "vanshjangir0001@gmail.com";
    const formData = new FormData();
    formData.append("resume", file);

    const response = await fetch('http://localhost:3000/uploadresume', {
      method: "POST",
      headers: {
        email: storeEmail,
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
      <h1>Upload Resume</h1>
      <input type="file" name="resume" onChange={handleFileChange}/>
      <button type="submit" onClick={fileUpload}>Upload</button>
    <div>
      score = {score}
    </div>
  </div>
  )
}

export default Home;
