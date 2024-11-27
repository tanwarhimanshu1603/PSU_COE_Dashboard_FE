import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import '../../css/admin/Search.css'
import '../../css/admin/SearchResultRow.css'
const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken")

  const debouncedSearch = debounce((query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = employeeData.filter((employee) =>
      (employee.empId && employee.empId.toLowerCase().includes(lowercasedQuery)) ||
      (employee.empName && employee.empName.toLowerCase().includes(lowercasedQuery)) ||
      (employee.empEmail && employee.empEmail.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredEmployees(filtered);
  }, 500); // Delay of 500ms

  const fetchAllEmployeeData = async () => {
    try {
      setError(""); // Clear previous errors
      setEmployeeData([]); // Clear previous results
      setFilteredEmployees([]);
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
      setFilteredEmployees(data)
    } catch (err) {
      setError(err.message);
      console.log(error)
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      debouncedSearch(searchInput);
    } else {
      setError("Please enter an Employee ID or Name");
    }
  };

  useEffect(() => {
    fetchAllEmployeeData();
  }, []
  )
  useEffect(() => {
    if (searchInput.trim() === "") {
      fetchAllEmployeeData();  // Fetch all employee data if input is empty
    }
  }, [searchInput]);  // Run every time searchInput changes
  return (
    <div class="search-container">
      <div style={{ position: "sticky", top: "0", backgroundColor: "white", height: "137px", display: "flex", alignItems: "center" }}>
        {/* <h1 style={{ padding: "5px", position: "sticky", marginLeft: "24px" }}>Find Employees</h1> */}
        <div class="search-box">

          <input type="text" placeholder="Search by ID, name or email" onChange={(e) => setSearchInput(e.target.value)} onKeyUp={handleSearch} />
          <button id='search-button' onClick={handleSearch}><i class='bx bx-search icon'></i></button>
        </div>
      </div>
      <div class="search-result-container">
        {filteredEmployees && filteredEmployees.map((employee, index) => (
          <div class="search-result-row" key={index}>
            <div class="employee-basic-info-container">
              <div class="employee-profile-pic">
                <img class="employee-image" src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" alt="" height="60px" />
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
            <Link to={`/admin/profile/${employee.empId}`}>
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