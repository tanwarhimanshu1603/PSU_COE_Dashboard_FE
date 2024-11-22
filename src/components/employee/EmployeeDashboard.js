import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve empId from localStorage
    const empId = localStorage.getItem("empId");
    // console.log(empId);
    
    if (!empId) {
      // If no empId is found, redirect to login page
      window.location.href = "/employeeLogin";
      return;
    }

    // Fetch employee details using empId
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/employee/getById/${empId}`);
        const data = await response.json();

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
    localStorage.removeItem("isLoggedIn"); // Remove login status
    navigate("/"); // Redirect to the homepage
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Logout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Employee Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      <div
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <p><strong>Employee ID:</strong> {employee.empId}</p>
              <p><strong>Name:</strong> {employee.empName}</p>
              <p><strong>Supervisor:</strong> {employee.supervisorName}</p>
              <p><strong>Amdocs Experience:</strong> {employee.amdocsExperience} years</p>
              <p><strong>Total Experience:</strong> {employee.totalExperience} years</p>
              <p><strong>Amdocs Journey:</strong> {employee.amdocsJourney}</p>
              <p><strong>Functional Knowledge:</strong> {employee.functionalKnowledge}</p>
              <p><strong>Primary Tech Skill:</strong> {employee.primaryTechSkill}</p>
              <p><strong>Secondary Tech Skill:</strong> {employee.secondaryTechSkill}</p>
              <p><strong>Primary Product Subdomain:</strong> {employee.primaryProductSubdomain}</p>
              <p><strong>Secondary Product:</strong> {employee.secondaryProduct}</p>
              <p><strong>DevOps Knowledge:</strong> {employee.devOpsKnowledge}</p>
              <p><strong>Mentoring Ability:</strong> {employee.mentoringAbility ? "Yes" : "No"}</p>
              <p><strong>Exploration Interest:</strong> {employee.explorationInterest ? "Yes" : "No"}</p>
              <p><strong>Contributed to Design:</strong> {employee.contributedToDesign ? "Yes" : "No"}</p>
              <p><strong>Engagement Activity Contribution:</strong> {employee.engagementActivityContribution ? "Yes" : "No"}</p>
              <p><strong>Presentation Skills:</strong> {employee.presentationSkills}/5</p>
              <p><strong>Hobbies & Sports:</strong> {employee.hobbiesSports}</p>
              <p><strong>Additional Info:</strong> {employee.additionalInfo}</p>
            </div>
    </div>
  );
};

export default EmployeeDashboard;
