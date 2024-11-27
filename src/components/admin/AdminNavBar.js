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
                        <img src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg"
                            alt="" width="55px" height="55px" class="profile-pic" />
                    </span>
                    <div class="text logo-text">
                        <span class="name">Vikrant</span>
                        <span class="profession">Administrator</span>
                    </div>
            </div>

            {/* <!-- <i class='bx bx-chevron-right toggle'></i> --> */}
        </header>
        <div class="menu-bar">
            <div class="menu">
                {/* <li class="search-box">
                    <i class='bx bx-search icon'></i>
                    <input type="text" placeholder="Search..." />
                </li> */}
                <ul class="menu-links">
                <Link to="/admin">
                    <li class="nav-link">
                        <div className='tab' >
                            <i class='bx bx-home-alt icon'></i>
                            <span class="text nav-text">Dashboard</span>
                        </div>
                    </li>
                    </Link>
                    {/* <Link to="search">
                    <li class="nav-link">
                    <div className='tab' >
                            <i class='bx bx-search icon'></i>
                            <span class="text nav-text">Search</span>
                        </div>
                    </li>
                    </Link> */}
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