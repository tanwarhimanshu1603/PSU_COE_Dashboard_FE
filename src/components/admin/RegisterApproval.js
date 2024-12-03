import React, { useEffect ,useState } from 'react'
import { useNavigate } from "react-router-dom";
const RegisterApproval = () => {
    const [approvalList,setApprovalList] = useState();
    const [error, setError] = useState("");
    const [empCount, setEmpCount] = useState(0);
    const jwtToken = localStorage.getItem("jwtToken")
    const navigate = useNavigate();
  const fetchAllApprovalList = async () => {
    try {
      setError("");
      const response = await fetch(`http://localhost:8080/api/v1/admin/getApprovals`, {
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

      setApprovalList(data);
      setEmpCount(data.length);
      
    } catch (err) {
      setError(err.message);
      console.log(error)
    }
  };
  const approveRequest = async (employee) => {
    try {
        console.log(employee)
    
      setError("");
      const response = await fetch(`http://localhost:8080/api/v1/admin/approve`, {
        method: 'POST', // or 'POST', etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`, // Include the token
        },
        body:JSON.stringify(employee),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("No employees found or error in fetching data");
      }

      fetchAllApprovalList();
    } catch (err) {
      setError(err.message);
      console.log(error)
    }
  };
  useEffect(() => {
    fetchAllApprovalList();
  }, []
  )
  return (
    <div className={`search-result-container`}>
          <p style={{ margin: "10px", color: "" }}>{empCount===0?"No pending request":`${empCount} request(s) are pending`}</p>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Email</th>
                <th className='role-heading'>Role</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {approvalList && approvalList.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.empName}</td>
                  <td>{employee.empId}</td>
                  <td>{employee.empEmail}</td>
                  <td className='role-name'>Software Developer</td>
                  <td>
                    
                      <button className="button open__submit" onClick={()=>approveRequest(approvalList[index])}>
                        <span className="button__text">Approve</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
{/*           
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} </span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= empCount}>Next</button>
          </div> */}
        </div>
  )
}

export default RegisterApproval