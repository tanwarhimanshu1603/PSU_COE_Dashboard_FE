import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateEmployee = () => {

    const location = useLocation();
    const [employee,setEmployee] = useState({
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
        setEmployee({
          ...employee,
          [name]: type === "checkbox" ? checked : value,
        });
      };

    useEffect(() => {
        setEmployee(location.state?.employee);
    }, []);

    // console.log(employee);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
    
        try {
          const response = await fetch("http://localhost:8080/api/v1/employee/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : localStorage.getItem("empToken")
            },
            body: JSON.stringify(employee),
          });

        //   console.log(response);
          
    
          if (!response.ok) {
            throw new Error("Failed to update employee. Please check the input fields.");
          }
    
          setSuccessMessage("Employee updated successfully!");
          setEmployee({
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
                  value={employee.empEmail}
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
                  value={employee.empPasswd}
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
                  value={employee.empId}
                  onChange={handleChange}
                  required
                  style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                Name:
                <input
                  type="text"
                  name="empName"
                  value={employee.empName}
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
                  value={employee.supervisorName}
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
                  value={employee.amdocsExperience}
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
                  value={employee.totalExperience}
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
                  value={employee.amdocsJourney}
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
                  value={employee.functionalKnowledge}
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
                  value={employee.primaryTechSkill}
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
                  value={employee.primaryProductSubdomain}
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
                  value={employee.secondaryTechSkill}
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
                  value={employee.secondaryProduct}
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
                  value={employee.devOpsKnowledge}
                  onChange={handleChange}
                  required
                  style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
                />
              </label>
            </div>
            {/* Repeat similar blocks for other fields */}
    
            <div style={{ marginBottom: "20px" }}>
              <label>
                Mentoring Ability:
                <input
                  type="checkbox"
                  name="mentoringAbility"
                  checked={employee.mentoringAbility}
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
                  checked={employee.explorationInterest}
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
                  checked={employee.contributedToDesign}
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
                  checked={employee.engagementActivityContribution}
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
                  value={employee.presentationSkills}
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
                  value={employee.hobbiesSports}
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
                  value={employee.additionalInfo}
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
              Update
            </button>
          </form>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      );
}

export default UpdateEmployee