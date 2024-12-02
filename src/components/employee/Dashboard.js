import React, { useEffect, useState } from "react";
import "../../css/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve empId from localStorage
    const empId = localStorage.getItem("empId");
    const empToken = localStorage.getItem("empToken");
    // console.log(empId);
    
    if (!empId || !empToken) {
      // If no empId is found, redirect to login page
      window.location.href = "/";
      return;
    }

    // Fetch employee details using empId
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/employee/getById/${empId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': empToken 
          }
        });
        const data = await response.json();
        // console.log(data);
        
        if (response.ok) {
          // console.log(data);
          
          setEmployee(data); // Set the employee data
        } else {
          setError("Failed to fetch employee details.");
        }
      } catch (err) {
        setError("An error occurred while fetching employee details.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchEmployeeDetails();
  }, []); // Empty dependency array means this effect runs once when the component is mounted
  

  const handleLogout = () => {
    localStorage.removeItem("empId"); // Remove empId from localStorage
    localStorage.removeItem("empToken"); // Remove login status
    localStorage.removeItem("isLoggedIn");
    navigate("/"); // Redirect to the homepage
  };

  const handleUpdate = () => {
    navigate("/updateEmployee", {state: {employee}}); // Redirect to the homepage
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">Hi, Himanshu</div>
        <div className="navbar-right">
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="cards-container">
        <div className="card-left">
          <div className="card">
            <h3>Employee Information</h3>
            <p>Employee ID: <span>{employee.empId}</span></p>
            <p>Name: <span>{employee.empName}</span></p>
            <p>Supervisor: <span>{employee.supervisorName}</span></p>
            <p>Amdocs Experience: <span>{employee.amdocsExperience} years</span></p>
            <p>Total Experience: <span>{employee.totalExperience} years</span></p>
            <p>
              Amdocs Journey: <span>{employee.amdocsJourney}</span>
            </p>
          </div>
          <div className="card">
            <h3>Additional Information</h3>
            <p>
              Mentoring Ability: <span className={`${employee.mentoringAbility ? 'emoji fas fa-check' : 'emoji-cross fas fa-xmark'}`}></span>
            </p>
            <p>
              Exploration Interest: <span className={`${employee.explorationInterest ? 'emoji fas fa-check' : 'emoji-cross fas fa-xmark'}`}></span>
            </p>
            <p>
              Contributed to Design: <span className={`${employee.contributedToDesign ? 'emoji fas fa-check' : 'emoji-cross fas fa-xmark'}`}></span>
            </p>
            <p>
              Engagement Activity Contribution: <span className={`${employee.engagementActivityContribution ? 'emoji fas fa-check' : 'emoji-cross fas fa-xmark'}`}></span>
            </p>
            <p>Presentation Skills: <span>{employee.presentationSkills}/5</span></p>
            <p>Hobbies & Sports: <span>{employee.hobbiesSports}</span></p>
            <p>Additional Info: <span>{employee.additionalInfo}</span></p>
          </div>
        </div>
        <div className="card-right">
          <h3>Technical Knowledge</h3>
          <p>
            Functional Knowledge:{" "}
            {employee.functionalKnowledge?.map((knowledge) => (
              <span className="tag" key={knowledge}>{knowledge}</span>
            ))}
          </p>
          <p>
            Primary Tech Skill: 
            {employee.primaryTechSkill?.map((skill) => (
              <span className="tag" key={skill}>{skill}</span>
            ))}
          </p>
          <p>
            Secondary Tech Skill: 
            <span className="tag">{employee.secondaryTechSkill}</span>
          </p>
          <p>
            Primary Product Subdomain:{" "}
            {employee.primaryProductSubdomain?.map((domain) => (
              <span className="tag" key={domain}>{domain}</span>
            ))}
          </p>
          <p>
            Secondary Product:{" "}
            <span className="tag">{employee.secondaryProduct}</span>
          </p>
          <p>DevOps Knowledge: <span>{employee.devOpsKnowledge}</span></p>
        </div>
        
        <div className="update-btn">
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
