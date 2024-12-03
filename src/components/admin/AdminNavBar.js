import React from 'react'
import '../../css/admin/AdminNavBar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const AdminNavBar = () => {
    const navigate = useNavigate(); 
    const handleLogout = () => {
        if(window.confirm("Are you sure you want to logout?")){
            localStorage.removeItem("jwtToken"); // Remove login status
            navigate("/"); // Redirect to the login page
        }
        
      };
  return (
    <nav className="sidebar">
        <header>
            <div className="company-logo" >
                <img src="https://cdn.freelogovectors.net/wp-content/uploads/2020/08/amdocs-logo.png" height="35px"
                    alt="" className="amdocs-logo" />
            </div>
            <div className="image-text">
                
                    <span className="image">
                        <img src="https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg"
                            alt="" width="55px" height="55px" className="profile-pic" />
                    </span>
                    <div className="text logo-text">
                        <span className="name">Vikrant</span>
                        <span className="profession">Administrator</span>
                    </div>
            </div>

            {/* <!-- <i class='bx bx-chevron-right toggle'></i> --> */}
        </header>
        <div className="menu-bar">
            <div className="menu">
                {/* <li class="search-box">
                    <i class='bx bx-search icon'></i>
                    <input type="text" placeholder="Search..." />
                </li> */}
                <ul className="menu-links">
                <Link to="/admin">
                    <li className="nav-link">
                        <div className='tab' >
                            <i className='bx bx-home-alt icon'></i>
                            <span className="text nav-text">Dashboard</span>
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
                    <li className="nav-link">
                    <div className='tab' >
                            <i className='bx bx-bar-chart-alt-2 icon'></i>
                            <span className="text nav-text">Manage Employee</span>
                        </div>
                    </li>
                    </Link>
                    <Link to="approve-request">
                    <li className="nav-link">
                    <div className='tab' >
                            <i className='bx bx-pie-chart-alt icon'></i>
                            <span className="text nav-text">Approvals</span>
                        </div>
                    </li>
                    </Link>
                </ul>
            </div>
            <div className="bottom-content">
            
                <li>
                <div className='tab' onClick={handleLogout}>
                        <i className='bx bx-log-out icon'></i>
                        <span className="text nav-text">Logout</span>
                   </div>
                </li>

            </div>
        </div>
    </nav>
  )
}

export default AdminNavBar