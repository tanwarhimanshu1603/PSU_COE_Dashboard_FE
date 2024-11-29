import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../css/Login.css'
import Logo from '../../static/images/amdocs_logo.png'
import 'font-awesome/css/font-awesome.min.css'
const Register = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const [formData, setFormData] = useState({
        empEmail: "",
        empPassword: "",
        empId: "",
        empName: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    
    const hashText = async (text) => {
        const encoder = new TextEncoder(); // Converts the string to a Uint8Array
        const data = encoder.encode(text); // Encode the text
      
        const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Compute the hash
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toString(); // Convert bytes to hex
        return hashHex; // Return the hash as a hex string
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setLoading(true);
        setErrorMessage("");
        const hashedPassword = await hashText(formData.empPassword);
        // console.log(hashedPassword);
        
        
    
        try {
          const response = await fetch("http://localhost:8080/api/v1/employee/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                empPassword: hashedPassword
            }),
          });
    
          if (!response.ok) {
            throw new Error("Failed to register employee. Please check the input fields.");
          }
    
          setSuccessMessage("Employee registered successfully!");
          setFormData({
            empEmail: "",
            empPassword: "",
            empId: "",
            empName: ""
          });
          const empToken = await response.text();
          localStorage.setItem("empToken",empToken);
          localStorage.setItem("empId", formData.empId);
          localStorage.setItem("isLoggedIn", true);
          navigate("/employeeDashboard");
        } catch (err) {
          setErrorMessage(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="content-container">
                <h2 id="typing-effect" className="welcome-message">Welcome to Professional Service Unit</h2>
                <div className="info-box">
                    <h5 className="info-heading">Improved Efficiency</h5>
                    <div className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Moiores itaque dolore tempore fugiat! Modi error id sapiente us?</div>
                </div>
                <div className="info-box">
                    <h5 className="info-heading">Efficient Management</h5>
                    <div className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Moiores itaque dolore tempore fugiat! Modi error id sapiente us?</div>
                </div>
                
                <div className="info-box">
                    <h5 className="info-heading">Account Centric</h5>
                    <div className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Moiores itaque dolore tempore fugiat! Modi error id sapiente us?</div>
                </div>
            </div>
            <div className="form-container">
                <div className="company-logo">
                    <img src={Logo} alt="" className="company-logo-img" />
                </div>
                <div className="login-form-container">
                    <div className="screen">
                        <div className="screen__content">
                            <form className="login" onSubmit={handleSubmit}>
                                <h1 style={{marginTop:0}}>Register as Employee</h1>
                                <div className="login__fields-row">
                                    <div className="login__field">
                                        <i className="login__icon fas fa-user"></i>
                                        <input type="text" className="login__input" placeholder="Name" name="empName" value={formData.empName} onChange={handleChange} required />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fas fa-id-card"></i>
                                        <input type="text" className="login__input" placeholder="Employee ID" name="empId" value={formData.empId} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="login__fields-row">
                                <div className="login__field">
                                        <i className="login__icon fas fa-envelope"></i>
                                        <input type="text" className="login__input" placeholder="Email" name="empEmail" value={formData.empEmail} onChange={handleChange} required />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fas fa-lock"></i>
                                        <input type="password" className="login__input" placeholder="Password" name="empPassword" value={formData.empPassword} onChange={handleChange} required />
                                    </div>
                                </div>
                                <button className="button login__submit" type="submit">
                                    <span className="button__text">Register</span>
                                    {loading && <i className="fa fa-spinner fa-spin" style={{marginLeft:"5px"}}></i>} 
                                </button> 
                            </form>
                            <div className="register-option">
                                Already Registered?<Link to="/"> <span>Login </span></Link>{errorMessage && <span style={{ color: "red", margin: 0, padding: "7px", textAlign: "center" }}>{errorMessage}</span>}
                            </div>
                        </div>
                        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register