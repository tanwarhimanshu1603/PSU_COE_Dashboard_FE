import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/Login.css'
import Logo from '../../static/images/amdocs_logo.png'
import 'font-awesome/css/font-awesome.min.css'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome to Professional Service Unit");
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        // If no adminToken is found
        // Check if employee is logged in
        const empToken = localStorage.getItem("empToken");
        if(empToken)navigate("/employeeDashboard");
      }else{
        navigate("/adminDashboard");
      }
    },[localStorage.getItem("jwtToken")]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error
        setLoading(true);
        try {
            // First API call to admin login
            const adminResponse = await fetch('http://localhost:8080/api/v1/admin/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ adminEmail:email, adminPassword:password }),
            });
        
            if (adminResponse.ok) {
              // If the response is OK, navigate to admin dashboard
              setLoading(false);
              const jwtToken = await adminResponse.text();
              localStorage.setItem("jwtToken",jwtToken);
              navigate('/adminDashboard');

              return;
            }
        
            // Second API call to employee login
            const employeeResponse = await fetch('http://localhost:8080/api/v1/employee/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({empEmail: email, empPasswd:password }),
            });
        
            if (employeeResponse.ok) {
              // If the response is OK, navigate to employee dashboard
              setLoading(false);
              const response = await employeeResponse.json();
              const jwtToken = response.token;
              const empId = response.employee.empId;
              localStorage.setItem("empToken",jwtToken);
              localStorage.setItem("empId",empId);
              navigate('/employeeDashboard');
            }
        
          } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error during login:', error);
            // Optionally handle error (e.g., show a user-friendly message)
          }
    };

    return (
        <div className="login-container">
            <div className="content-container">
                <h2 id="typing-effect" className="welcome-message">{welcomeMessage}</h2>
                <div className="info-box">
                    <h3 className="info-heading">Improved Efficiency</h3>
                    <div className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Moiores itaque dolore tempore fugiat! Modi error id sapiente us?</div>
                </div>
                <div className="info-box">
                    <h3 className="info-heading">It is good</h3>
                    <div className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Moiores itaque dolore tempore fugiat! Modi error id sapiente us?</div>
                </div>
                
                <div className="info-box">
                    <h3 className="info-heading">It helps Employees</h3>
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
                                <h1 style={{marginTop:0}}>Login</h1>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input type="text" className="login__input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input type="password" className="login__input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <button className="button login__submit" type="submit">
                                    <span className="button__text">Log In Now  </span>
                                    {loading && <i className="fa fa-spinner fa-spin" style={{marginLeft:"5px"}}></i>}
                                    <i className="button__icon fas fa-chevron-right"></i>
                                </button> 
                            </form>
                            <div className="register-option">
                                Not Registered Yet? <span onClick={() => navigate("/employeeRegister")}>Register </span>{error && <span style={{ color: "red", margin: 0, padding: "7px", textAlign: "center" }}>{error}</span>}
                            </div> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login