import React, { useEffect, useState } from 'react'

const ManageEmployee = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [error,setError] = useState("");
    // const [jwtToken,setJWTToken] = useState(null);
    const jwtToken = localStorage.getItem("jwtToken");
    
    useEffect(() => {
        // setJWTToken(localStorage.getItem("jwtToken"));
        const data = async () => {
            const response = await fetchAllEmp();
            console.log(response);
            
        }
        // console.log(data);
        data();
    },[])

    const fetchAllEmp = async () => {
        try {
          setError(""); // Clear previous errors
        //   setEmployeeData([]); // Clear previous results
        //   setFilteredEmployees([]);
          const response = await fetch(`http://localhost:8080/api/v1/admin/getAllEmp`, {
            method: 'GET', 
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
          
          return data;
          
        //   setEmployeeData(data);
        //   setFilteredEmployees(data)
        } catch (err) {
          setError(err.message);
          console.log(error)
        }
    };

  return (
    <div>ManageEmployee</div>
  )
}

export default ManageEmployee