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
  const [empCount, setEmpCount] = useState(0);

  const debouncedSearch = debounce((query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = employeeData.filter((employee) =>
      (employee.empId && employee.empId.toLowerCase().includes(lowercasedQuery)) ||
      (employee.empName && employee.empName.toLowerCase().includes(lowercasedQuery)) ||
      (employee.empEmail && employee.empEmail.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredEmployees(filtered);
    setEmpCount(filtered.length);
  }, 500); // Delay of 500ms

  const fetchAllEmployeeData = async () => {
    try {
      setError(""); // Clear previous errors
      // setEmployeeData([]); // Clear previous results
      // setFilteredEmployees([]);

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
      setEmpCount(data.length);
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
    <div className="search-container">
      <div style={{ position: "sticky", top: "0", backgroundColor: "white", height: "102px", display: "flex", alignItems: "center" ,justifyContent:"space-between",flexWrap:"wrap"}}>
        {/* <h1 style={{ padding: "5px", position: "sticky", marginLeft: "24px" }}>Find Employees</h1> */}
        <div className="search-box">
          <input type="text" placeholder="Search by ID, name or email" onChange={(e) => setSearchInput(e.target.value)} onKeyUp={handleSearch} />
          <button id='search-button' onClick={handleSearch}><i className='bx bx-search icon'></i></button>
        </div>

        <div className='other-options'>
          <div class="download-button">
            <button>Download as </button>
            <select id="download-format" class="dropdown">
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div class="filter-button">
            <button>Filter</button>
          </div>
        </div>
      </div>
      <div className="search-result-container">
        <p style={{ margin: "10px", color: "" }}>{empCount} results found!</p>

        {filteredEmployees && filteredEmployees.map((employee, index) => (
          <div className="search-result-row" key={index}>
            <div className="employee-basic-info-container">
              <div className="employee-profile-pic">
                <img className="employee-image" src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" alt="" height="60px" />
              </div>
              <div className="employee-basic-info">
                <div className="employee-name">{employee.empName}</div>
                <div className="employee-role">Software Developer</div>
              </div>
            </div>
            <div className="employee-id-container">
              <div className="employee-id"><span>ID : </span>{employee.empId}</div>
              <div className="employee-email"><i className="icon fas fa-user"></i>{employee.empEmail}</div>
            </div>
            <Link to={`/admin/profile/${employee.empId}`}>
              <button className="button open__submit">
                <span className="button__text">Manage</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search