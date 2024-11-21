import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/Login.css'
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      const response = await fetch("http://localhost:8080/api/v1/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminEmail: email, adminPassword: password })
      });

      // console.log(response);
      
      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      
      if (response.ok) {
        localStorage.setItem("isLoggedIn", true);
        // alert("Login successful!");
        navigate("/adminDashboard"); // Redirect to admin dashboard
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Administrator Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="btn-container">
        <button type="submit" className='btn' >Submit</button>
        </div>
        {/* <span>Not registered yet?<span onClick={handleClick} style={{cursor:'pointer',color:'#00f1ff'}}>Register</span></span> */}
        
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
