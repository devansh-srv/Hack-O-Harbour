import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Company from './components/Company'
import Jobs from './components/Jobs'
import Createjob from './components/Createjob'
import Jobstatus from './components/Jobstatus'
import Applicant from './components/Applicant'
import Skilltest from './components/Skilltest'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/applicant" element={<Applicant/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/jobs" element={<Jobs/>}></Route>
        <Route path="/company" element={<Company/>}></Route>
        <Route path="/createjob" element={<Createjob/>}></Route>
        <Route path="/jobstatus" element={<Jobstatus/>}></Route>
        <Route path="/skilltest" element={<Skilltest/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
