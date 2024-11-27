import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
 
import { Link } from 'react-router-dom';
import '../../css/admin/Search.css'
import '../../css/admin/SearchResultRow.css'
const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken")
  const fetchEmployeeData = async () => {
    try {
      setError(""); // Clear previous errors
      setEmployeeData([]); // Clear previous results

      const response = await fetch(`http://localhost:8080/api/v1/admin/getEmp/${searchInput}`, {
        // const response = await fetch(`http://localhost:8080/api/v1/admin/getAllEmp`, {
        method: 'GET', // or 'POST', etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`, // Include the token
        },
      });

      if (!response.ok) {
        throw new Error("No employees found or error in fetching data");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: Expected an array");
      }

      setEmployeeData(data);
      console.log(employeeData)
    } catch (err) {
      setError(err.message);
      console.log(error)
    }
  };

  const fetchAllEmployeeData = async () => {
    try {
      setError(""); // Clear previous errors
      setEmployeeData([]); // Clear previous results

      // const response = await fetch(`http://localhost:8080/api/v1/admin/getEmp/${searchInput}`, {
        const response = await fetch(`http://localhost:8080/api/v1/admin/getAllEmp`, {
        method: 'GET', // or 'POST', etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`, // Include the token
        },
      });

      if (!response.ok) {
        throw new Error("No employees found or error in fetching data");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: Expected an array");
      }

      setEmployeeData(data);
      console.log(employeeData)
    } catch (err) {
      setError(err.message);
      console.log(error)
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

  useEffect(()=>{
    fetchAllEmployeeData();
  },[]
  )
  useEffect(() => {
    if (searchInput.trim() === "") {
      fetchAllEmployeeData();  // Fetch all employee data if input is empty
    }
  }, [searchInput]);  // Run every time searchInput changes
  return (
    <div class="search-container">
      <div style={{ position: "sticky", top: "0", backgroundColor: "white", height: "137px",display:"flex",alignItems:"center" }}>
        {/* <h1 style={{ padding: "5px", position: "sticky", marginLeft: "24px" }}>Find Employees</h1> */}
        <div class="search-box">
          
          <input type="text" placeholder="Search by ID or name" onChange={(e) => setSearchInput(e.target.value)} onKeyUp={handleSearch} />
          <button id='search-button' onClick={handleSearch}><i class='bx bx-search icon'></i></button>
        </div>
      </div>
      <div class="search-result-container">
        {/* <div class="search-result-row">
          <div class="employee-basic-info-container">
            <div class="employee-profile-pic">
              <img class="employee-image" src="https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_fullxfull.4827441773_887m.jpg" alt="" height="60px" />
            </div>
            <div class="employee-basic-info">
              <div class="employee-name">Vikrant kumar</div>
              <div class="employee-role">Software Developer</div>
            </div>
          </div>
          <div class="employee-id-container">
            <div class="employee-id"><span>ID : </span>206311</div>
            <div class="employee-email"><i class="icon fas fa-user"></i>vikranku@amdocs.com</div>
          </div>
          <Link to={`profile/${123}`}>
          <button class="button open__submit">
            <span class="button__text">Manage</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
          </Link>
        </div> */}
        {/* <div class="search-result-row">
          <div class="employee-basic-info-container">
            <div class="employee-profile-pic">
              <img class="employee-image" src="https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_fullxfull.4827441773_887m.jpg" alt="" height="60px" />
            </div>
            <div class="employee-basic-info">
              <div class="employee-name">Vikrant kumar</div>
              <div class="employee-role">Software Developer</div>
            </div>
          </div>
          <div class="employee-id-container">
            <div class="employee-id"><span>ID : </span>206311</div>
            <div class="employee-email"><i class="icon fas fa-user"></i>vikranku@amdocs.com</div>
          </div>
          <button class="button open__submit">
            <span class="button__text">Manage</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
        </div> */}

        {employeeData && employeeData.map((employee, index) => (
          <div class="search-result-row" key={index}>
            <div class="employee-basic-info-container">
              <div class="employee-profile-pic">
                <img class="employee-image" src="https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_fullxfull.4827441773_887m.jpg" alt="" height="60px" />
              </div>
              <div class="employee-basic-info">
                <div class="employee-name">{employee.empName}</div>
                <div class="employee-role">Software Developer</div>
              </div>
            </div>
            <div class="employee-id-container">
              <div class="employee-id"><span>ID : </span>{employee.empId}</div>
              <div class="employee-email"><i class="icon fas fa-user"></i>{employee.empEmail}</div>
            </div>
            <Link to={`profile/${employee.empId}`}>
              <button class="button open__submit">
                <span class="button__text">Manage</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
              </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search