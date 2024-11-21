import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [searchInput, setSearchInput] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const isLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log(empId);
    
    if (!isLoggedIn) {
      // If no empId is found, redirect to login page
      window.location.href = "/adminLogin";
      return;
    }

    
  const fetchEmployeeData = async () => {
    try {
      setError(""); // Clear previous errors
      setEmployeeData([]); // Clear previous results

      const response = await fetch(`http://localhost:8080/api/v1/admin/getEmp/${searchInput}`);

      if (!response.ok) {
        throw new Error("No employees found or error in fetching data");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: Expected an array");
      }

      setEmployeeData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchEmployeeData();
    } else {
      setError("Please enter an Employee ID or Name");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    navigate("/"); // Redirect to the login page
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Dashboard</h1>
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

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Employee ID or Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {employeeData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Employee Details</h2>
          {employeeData.map((employee, index) => (
            <div
              key={index}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
