import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Add useParams here
const EmployeeProfilePage = () => {
    const { empId } = useParams();  // Extract empId from URL parameters
    const [searchInput, setSearchInput] = useState("");
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const empToken = localStorage.getItem("empToken");

      // Check if empId or empToken are not found in URL or localStorage
      if (!empId || !empToken) {
        window.location.href = "/";
        return;
      }

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

          if (response.ok) {
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
    }, [empId]);  // The useEffect now depends on the empId from URL

    const handleLogout = () => {
      localStorage.removeItem("empId");
      localStorage.removeItem("empToken");
      localStorage.removeItem("isLoggedIn");
      navigate("/"); // Redirect to the homepage
    };

    const fetchSearchEmployeeData = async () => {
      try {
        setError(""); 
        setEmployeeData([]); 

        const response = await fetch(`http://localhost:8080/api/v1/employee/getEmp/${searchInput}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("empToken")
          }
        });

        if (!response.ok) {
          throw new Error("No employees found or error in fetching data");
        }

        const data = await response.json();
        console.log(data);

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
        fetchSearchEmployeeData();
      } else {
        setError("Please enter an Employee ID or Name");
      }
    };

    const handleUpdate = () => {
      navigate("/updateEmployee", {state: {employee}}); 
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Employee Dashboard</h1>
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
          <div>
            <button
              onClick={handleUpdate}
              style={{
                margin: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#cea05c",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update
            </button>
            <button
              onClick={handleLogout}
              style={{
                margin: "5px",
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
}

export default EmployeeProfilePage;
