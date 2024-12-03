import React, { useState, useEffect } from 'react';
import "../../css/Dashboard.css";

import { useNavigate, useParams } from 'react-router-dom';  // Add useParams here
const EmployeeProfilePage = () => {
    const { empId } = useParams();  // Extract empId from URL parameters
    console.log(empId)
    const [searchInput, setSearchInput] = useState("");
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const jwtToken = localStorage.getItem("jwtToken");

      // Check if empId or empToken are not found in URL or localStorage
      if (!empId || !jwtToken) {
        window.location.href = "/";
        return;
      }

      const fetchEmployeeDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/admin/getById/${empId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${jwtToken}` 
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

        const response = await fetch(`http://localhost:8080/api/v1/admin/getEmp/${searchInput}`,{
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
      navigate(`update`, {state: {employee}}); 
    };

    const handleDelete = async () => {
      try {
        // Ensure the employee object exists (i.e., you're trying to delete a valid employee)
        if (!employee) {
          alert("No employee data available for deletion.");
          return;
        }
    
        const jwtToken = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
    
        if (!jwtToken) {
          alert("Unauthorized. Please login first.");
          return;
        }
    
        // Send DELETE request to the API to delete the employee
        const response = await fetch("http://localhost:8080/api/v1/admin/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${jwtToken}`, // Add the Bearer token to the Authorization header
          },
          body: JSON.stringify(employee), // Send the employee object in the request body
        });
    
        if (response.ok) {
          alert("Employee deleted successfully.");
          // You can optionally redirect the user after successful deletion
          navigate("/admin/manage"); // Navigate to the employees list or dashboard after deletion
        } else {
          // Handle error cases
          const data = await response.json();
          alert(`Error: ${data.message || "Failed to delete employee."}`);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("An error occurred while deleting the employee.");
      }
    };
    
    

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="dashboard-container">
        {/* <nav className="navbar">
          <div className="navbar-left">Hi, Himanshu</div>
          <div className="navbar-right">
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav> */}
        <div className="cards-container">
          <div className="card-left">
            <div className="card">
              <h3>Employee Information</h3>
              <p>Employee ID: <span>{employee.empId}</span></p>
              <p>Name: <span>{employee.empName}</span></p>
              <p>Email: <span>{employee.empEmail}</span></p>
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
              <span className={`${employee.secondaryTechSkill && "tag"}`}>{employee.secondaryTechSkill}</span>
            </p>
            <p>
              Primary Product Subdomain:{" "}
              {employee.primaryProductSubdomain?.map((domain) => (
                <span className="tag" key={domain}>{domain}</span>
              ))}
            </p>
            <p>
              Secondary Product:{" "}
              <span className={`${employee.secondaryProduct && "tag"}`}>{employee.secondaryProduct}</span>
            </p>
            <p>DevOps Knowledge: <span>{employee.devOpsKnowledge}</span></p>
          </div>
          <div className="update-btn">
            <button onClick={handleUpdate} className='update'>Update</button>
            <button onClick={handleDelete} className='delete'>Delete</button>
          </div>
        </div>
      </div>
    );
}

export default EmployeeProfilePage;
