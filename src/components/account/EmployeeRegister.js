import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    empEmail: "",
    empPasswd: "",
    empId: "",
    empName: "",
    supervisorName: "",
    amdocsExperience: "",
    totalExperience: "",
    amdocsJourney: "",
    functionalKnowledge: "",
    primaryTechSkill: "",
    primaryProductSubdomain: "",
    secondaryTechSkill: "",
    secondaryProduct: "",
    devOpsKnowledge: "",
    mentoringAbility: false,
    explorationInterest: false,
    contributedToDesign: false,
    engagementActivityContribution: false,
    presentationSkills: "",
    hobbiesSports: "",
    additionalInfo: "",
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
        empId: "",
        empName: "",
        supervisorName: "",
        amdocsExperience: "",
        totalExperience: "",
        amdocsJourney: "",
        functionalKnowledge: "",
        primaryTechSkill: "",
        primaryProductSubdomain: "",
        secondaryTechSkill: "",
        secondaryProduct: "",
        devOpsKnowledge: "",
        mentoringAbility: false,
        explorationInterest: false,
        contributedToDesign: false,
        engagementActivityContribution: false,
        presentationSkills: "",
        hobbiesSports: "",
        additionalInfo: "",
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
        {/* <div style={{ marginBottom: "20px" }}>
          <label>
            Name:
            <input
              type="text"
              name="empName"
              value={formData.empName}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Supervisor Name:
            <input
              type="text"
              name="supervisorName"
              value={formData.supervisorName}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Amdocs Experience:
            <input
              type="text"
              name="amdocsExperience"
              value={formData.amdocsExperience}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Total Experience:
            <input
              type="text"
              name="totalExperience"
              value={formData.totalExperience}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Amdocs Journey:
            <input
              type="text"
              name="amdocsJourney"
              value={formData.amdocsJourney}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Functional Knowledge:
            <input
              type="text"
              name="functionalKnowledge"
              value={formData.functionalKnowledge}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Primary Tech Skill:
            <input
              type="text"
              name="primaryTechSkill"
              value={formData.primaryTechSkill}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Primary Product/SubDomain:
            <input
              type="text"
              name="primaryProductSubdomain"
              value={formData.primaryProductSubdomain}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Secondary Tech Skills:
            <input
              type="text"
              name="secondaryTechSkill"
              value={formData.secondaryTechSkill}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Secondary Product:
            <input
              type="text"
              name="secondaryProduct"
              value={formData.secondaryProduct}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Devops Knowledge:
            <input
              type="text"
              name="devOpsKnowledge"
              value={formData.devOpsKnowledge}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div> */}




        {/* Repeat similar blocks for other fields */}
{/* 
        <div style={{ marginBottom: "20px" }}>
          <label>
            Mentoring Ability:
            <input
              type="checkbox"
              name="mentoringAbility"
              checked={formData.mentoringAbility}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Exploration Interest:
            <input
              type="checkbox"
              name="explorationInterest"
              checked={formData.explorationInterest}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Contributed to Design:
            <input
              type="checkbox"
              name="contributedToDesign"
              checked={formData.contributedToDesign}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Contribution to Engagement Activities:
            <input
              type="checkbox"
              name="engagementActivityContribution"
              checked={formData.engagementActivityContribution}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Presentation Skills:
            <input
              type="number"
              name="presentationSkills"
              value={formData.presentationSkills}
              onChange={handleChange}
              required
              min="1"
              max="5"
              style={{ marginLeft: "10px", padding: "5px", width: "50px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Hobbies:
            <input
              type="text"
              name="hobbiesSports"
              value={formData.hobbiesSports}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Additional Info:
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div> */}
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
