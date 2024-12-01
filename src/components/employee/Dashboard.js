import React, { useState } from "react";
import "../../css/Dashboard.css";

function Dashboard() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">Hi, Himanshu</div>
        <div className="navbar-right">
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" // Replace with actual user image URL
            alt="User"
            className="user-image"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="dropdown">
              <div className="dropdown-item">Update Profile</div>
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
      </nav>
      <div className="cards-container">
        <div className="card">
          <h3>Employee Information</h3>
          <p>Employee ID: 456789</p>
          <p>Name: Himanshu Tanwar</p>
          <p>Supervisor: Monika</p>
          <p>Amdocs Experience: 0.3 years</p>
          <p>Total Experience: 0.6 years</p>
          <p>
            Amdocs Journey: Started as a Junior Developer, now a Senior
            Developer with leadership responsibilities in the Cloud team.
          </p>
        </div>
        <div className="card">
          <h3>Technical Knowledge</h3>
          <p>
            Functional Knowledge:{" "}
            <span className="tag">PSU</span>
            <span className="tag">D1</span>
          </p>
          <p>
            Primary Tech Skill: <span className="tag">JAVA</span>
          </p>
          <p>
            Secondary Tech Skill: <span className="tag">React</span>
          </p>
          <p>
            Primary Product Subdomain:{" "}
            <span className="tag">Real Time Billing</span>
          </p>
          <p>
            Secondary Product:{" "}
            <span className="tag">Cloud Service Management</span>
          </p>
          <p>DevOps Knowledge: None</p>
        </div>
        <div className="card">
          <h3>Additional Information</h3>
          <p>
            Mentoring Ability: <span className="emoji">❌</span>
          </p>
          <p>
            Exploration Interest: <span className="emoji">✔️</span>
          </p>
          <p>
            Contributed to Design: <span className="emoji">❌</span>
          </p>
          <p>
            Engagement Activity Contribution: <span className="emoji">✔️</span>
          </p>
          <p>Presentation Skills: 2/5</p>
          <p>Hobbies & Sports: Football, Badminton</p>
          <p>Additional Info: Willing to learn new technologies.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
