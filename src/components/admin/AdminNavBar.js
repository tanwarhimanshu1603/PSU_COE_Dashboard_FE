import React from 'react'
import '../../css/admin/AdminNavBar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const AdminNavBar = () => {
    const navigate = useNavigate(); 
    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // Remove login status
        navigate("/"); // Redirect to the login page
      };
  return (
    <nav class="sidebar">
        <header>
            <div class="company-logo" >
                <img src="https://cdn.freelogovectors.net/wp-content/uploads/2020/08/amdocs-logo.png" height="35px"
                    alt="" class="amdocs-logo" />
            </div>
            <div class="image-text">
                
                    <span class="image">
                        <img src="https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_fullxfull.4827441773_887m.jpg"
                            alt="" width="55px" height="55px" class="profile-pic" />
                    </span>
                    <div class="text logo-text">
                        <span class="name">👋 Hello, Vikrant</span>
                        <span class="profession">Administrator</span>
                    </div>
            </div>

        </header>
        <div class="menu-bar">
            <div class="menu">
              
                <ul class="menu-links">
                <Link to="/admin">
                    <li class="nav-link">
                        <div className='tab' >
                            <i class='bx bx-home-alt icon'></i>
                            <span class="text nav-text">Dashboard</span>
                        </div>
                    </li>
                    </Link>
                    
                    <Link to="manage">
                    <li class="nav-link">
                    <div className='tab' >
                            <i class='bx bx-bar-chart-alt-2 icon'></i>
                            <span class="text nav-text">Manage Employee</span>
                        </div>
                    </li>
                    </Link>
                    <Link to="analytics">
                    <li class="nav-link">
                    <div className='tab' >
                            <i class='bx bx-pie-chart-alt icon'></i>
                            <span class="text nav-text">Analytics</span>
                        </div>
                    </li>
                    </Link>
                </ul>
            </div>
            <div class="bottom-content">
            
                <li>
                <div className='tab' onClick={handleLogout}>
                        <i class='bx bx-log-out icon'></i>
                        <span class="text nav-text">Logout</span>
                   </div>
                </li>

            </div>
        </div>
    </nav>
  )
}

export default AdminNavBar