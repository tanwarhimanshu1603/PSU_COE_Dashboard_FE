import React, { useEffect } from "react";
import { BrowserRouter as  Router, Routes, Route, useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import '../../css/admin/AdminDashboard.css'
import Search from "./Search";
import EmployeeProfilePage from "./EmployeeProfilePage";
const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
      // console.log(empId);
      
      if (!jwtToken) {
        // If no adminToken is found
        // Check if employee is logged in
        const empToken = localStorage.getItem("empToken");
        if(empToken)navigate("/employeeDashboard");
        else window.location.href = "/";
        return;
      }
  },[]);
    // console.log(empId);
    


  return (
    
     <div className="admin-dashboard">
         <AdminNavBar/>
         <Routes>
          <Route path="search" element={<Search/>} />
          <Route path="manage" element={<Search/>} />
          <Route path="profile:empId" element={<EmployeeProfilePage/>} />
         </Routes>
     </div>
     
  );
};

export default AdminDashboard;