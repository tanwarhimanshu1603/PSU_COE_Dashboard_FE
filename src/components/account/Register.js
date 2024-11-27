import React, { useEffect, useState } from 'react'
import '../../css/Register.css'
import AmdocsLogo from "../../static/images/amdocs_logo.png";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const [formData, setFormData] = useState({
        empEmail: "",
        empPasswd: "",
        empId: "",
        empName: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            empName: firstName + " " + lastName,
        }))
    },[firstName,lastName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        if(formData.empPasswd !== confirmPassword){
            setErrorMessage("Password does not match");
            return;
        }
    
        try {
          const response = await fetch("http://localhost:8080/api/v1/employee/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error("Failed to register employee. Please check the input fields.");
          }
    
          setSuccessMessage("Employee registered successfully!");
          setFormData({
            empEmail: "",
            empPasswd: "",
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
    <div className="register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src={AmdocsLogo} alt=""/>
                        <h3>Welcome</h3>
                        <p>Lorem empsum!</p>
                        {/* <input type="button" name="" value="Login"/><br/> */}
                        <Link to="/"><input type="button" name="" value="Login"/></Link>
                    </div>
                    <form onSubmit={handleSubmit} className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active">
                                <h3 className="register-heading">Register as an Employee</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" required onChange={(e) => setFirstName(e.target.value)} className="form-control" placeholder="First Name *" value={firstName} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" required onChange={(e) => setLastName(e.target.value)} className="form-control" placeholder="Last Name *" value={lastName} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" required onChange={handleChange} name='empPasswd' className="form-control" placeholder="Password *" value={formData.empPasswd} />
                                        </div>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" required onChange={handleChange} name='empEmail' className="form-control" placeholder="Your Email *" value={formData.empEmail} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" required onChange={handleChange} name='empId' minLength="6" maxLength="7" className="form-control" placeholder="Your Employee ID *" value={formData.empId} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" required onChange={(e) => setConfirmPassword(e.target.value)} className="form-control"  placeholder="Confirm Password *" value={confirmPassword} />
                                        </div>
                                        <input type="submit" className="btnRegister" value="Register"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
            </div>
  )
}

export default Register