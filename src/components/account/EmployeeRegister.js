import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    empEmail: "",
    empPasswd: "",
    empId: "",
    // empName: "",
    // supervisorName: "",
    // amdocsExperience: "",
    // totalExperience: "",
    // amdocsJourney: "",
    // functionalKnowledge: "",
    // primaryTechSkill: "",
    // primaryProductSubdomain: "",
    // secondaryTechSkill: "",
    // secondaryProduct: "",
    // devOpsKnowledge: "",
    // mentoringAbility: false,
    // explorationInterest: false,
    // contributedToDesign: false,
    // engagementActivityContribution: false,
    // presentationSkills: "",
    // hobbiesSports: "",
    // additionalInfo: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/employee/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register employee. Please check the input fields.");
      }

      setSuccessMessage("Employee registered successfully!");
      setFormData({
        empEmail: "",
        empPasswd: "",
        empId: ""
      });

      localStorage.setItem("empId", formData.empId);
        
      localStorage.setItem("isLoggedIn", true);
      navigate("/employeeDashboard");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Employee Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Email:
            <input
              type="email"
              name="empEmail"
              value={formData.empEmail}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Password:
            <input
              type="password"
              name="empPasswd"
              value={formData.empPasswd}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Employee ID:
            <input
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Register
        </button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default EmployeeRegister;
