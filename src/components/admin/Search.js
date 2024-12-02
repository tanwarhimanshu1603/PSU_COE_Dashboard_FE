import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import '../../css/admin/Search.css'
import '../../css/admin/SearchResultRow.css'
import FilterSidebar from './FilterSidebar';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const Search = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSubdomains, setSelectedSubdomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState('csv');
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);  // New state for current page
  const [itemsPerPage, setItemsPerPage] = useState(6);  // New state for items per page
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken")
  const [empCount, setEmpCount] = useState(0);

  // Function to open the panels
  const openPanels = () => {
    setIsFilterSidebarOpen(true);
  };

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
      console.log(data)
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

  // Apply selected filters to employee data
  const applyFilters = () => {
    let filtered = employeeData;

    // Filter by skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(employee => selectedSkills.some(skill => employee.primaryTechSkill?.includes(skill)));
    }

    // Filter by subdomains
    if (selectedSubdomains.length > 0) {
      filtered = filtered.filter(employee => selectedSubdomains.some(subdomain => employee.primaryProductSubdomain?.includes(subdomain)));
    }

    // Filter by domains
    if (selectedDomains.length > 0) {
      filtered = filtered.filter(employee => selectedDomains.some(domain => employee.functionalKnowledge?.includes(domain)));
    }

    setFilteredEmployees(filtered);
    setEmpCount(filtered.length);
  };
  const resetSearchAndFilters = () => {
    setSearchInput("");  // Clear search input
    setSelectedSkills([]);  // Reset selected skills
    setSelectedSubdomains([]);  // Reset selected subdomains
    setSelectedDomains([]);  // Reset selected domains
    setFilteredEmployees(employeeData);  // Show all employees
    setEmpCount(employeeData.length);  // Reset employee count
  };
  const paginateResults = (data) => {
    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    return data.slice(indexOfFirstEmployee, indexOfLastEmployee);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const downloadCSV = () => {
    const headers = ["Name", "ID", "Email", "Role"];
    const rows = filteredEmployees.map(emp => [
      emp.empName,
      emp.empId,
      emp.empEmail,
      "Software Developer",  // Example Role, adapt if needed
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create a Blob from the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "employees.csv");
      link.click();
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Employee List", 20, 20);

    const headers = ["Name", "ID", "Email", "Role"];
    const rows = filteredEmployees.map(emp => [
      emp.empName,
      emp.empId,
      emp.empEmail,
      "Software Developer",  // Example Role, adapt if needed
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30,  // Adjust to prevent overlap
    });

    doc.save("employees.pdf");
  };
  useEffect(() => {
    fetchAllEmployeeData();
  }, []
  )
  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredEmployees(employeeData)
      setEmpCount(employeeData.length)
    }
  }, [searchInput]);  // Run every time searchInput changes
  const paginatedEmployees = paginateResults(filteredEmployees);
  return (
    <div className="search-container">
      <div style={{ position: "sticky", top: "0", backgroundColor: "white", height: "102px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", zIndex: 1 }}>
        {/* <h1 style={{ padding: "5px", position: "sticky", marginLeft: "24px" }}>Find Employees</h1> */}
        <div className="search-box">
          <input type="text" placeholder="Search by ID, name or email" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyUp={handleSearch} />
          <button id='search-button' onClick={handleSearch}><i className='bx bx-search icon'></i></button>
        </div>

        <div className='other-options'>
          <div class="download-button">
            <button onClick={() => {
              if (downloadFormat === "csv") {
                downloadCSV();
              } else if (downloadFormat === "pdf") {
                downloadPDF();
              }
            }}>Download as </button>
            <select id="download-format" class="dropdown" onChange={(e) => setDownloadFormat(e.target.value)} >
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div class="filter-button">
            <button onClick={openPanels}>Filter</button>
          </div>
        </div>
      </div>
      <div className='result-container'>
        <div className={`search-result-container ${isFilterSidebarOpen ? 'open' : ''}`}>
          <p style={{ margin: "10px", color: "" }}>{empCount} results found!</p>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Email</th>
                <th className='role-heading'>Role</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees && paginatedEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.empName}</td>
                  <td>{employee.empId}</td>
                  <td>{employee.empEmail}</td>
                  <td className='role-name'>Software Developer</td>
                  <td>
                    <Link to={`/admin/profile/${employee.empId}`}>
                      <button className="button open__submit">
                        <span className="button__text">Manage</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= empCount}>Next</button>
          </div>
        </div>
        <FilterSidebar
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          selectedSubdomains={selectedSubdomains}
          setSelectedSubdomains={setSelectedSubdomains}
          selectedDomains={selectedDomains}
          setSelectedDomains={setSelectedDomains}
          isFilterSidebarOpen={isFilterSidebarOpen}
          setIsFilterSidebarOpen={setIsFilterSidebarOpen}
          applyFilters={applyFilters}
          resetSearchAndFilters={resetSearchAndFilters}
        />
      </div>
    </div>
  )
}

export default Search