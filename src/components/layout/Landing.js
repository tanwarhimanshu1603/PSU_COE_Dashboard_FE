import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/Landing.css'
const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-header">
        {/* <img src="your-logo.png" alt="Logo" className="logo" /> */}
        <h1>Welcome to PSU</h1>
        <p>Please choose an option below to continue</p>
      </div>
      <div className="landing-buttons">
        <Link to="/adminLogin">
          <button className="landing-btn admin-btn">Admin Login</button>
        </Link>
        <Link to="/employeeLogin">
          <button className="landing-btn employee-btn">Employee Login</button>
        </Link>
        <Link to="/employeeRegister">
          <button className="landing-btn register-btn">Employee Register</button>
        </Link>
      </div>
    </div>
  )
}

export default Landing