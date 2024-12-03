import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/UpdateEmployee.css';

const UpdateEmployee = () => {
  const location = useLocation();
  const [employee, setEmployee] = useState({
    empEmail: '',
    empPassword: '',
    empId: '',
    empName: '',
    supervisorName: '',
    amdocsExperience: '',
    totalExperience: '',
    amdocsJourney: '',
    functionalKnowledge: [],
    primaryTechSkill: [],
    primaryProductSubdomain: [],
    secondaryTechSkill: '',
    secondaryProduct: '',
    devOpsKnowledge: '',
    mentoringAbility: false,
    explorationInterest: false,
    contributedToDesign: false,
    engagementActivityContribution: false,
    presentationSkills: '',
    hobbiesSports: '',
    additionalInfo: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (['functionalKnowledge', 'primaryTechSkill', 'primaryProductSubdomain'].includes(name)) {
      setEmployee({
        ...employee,
        [name]: value.split(',').map((item) => item.trim()),
      });
    } else {
      setEmployee({
        ...employee,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  useEffect(() => {
    setEmployee(location.state?.employee);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/v1/employee/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('empToken'),
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee. Please check the input fields.');
      }

      setSuccessMessage('Employee updated successfully!');
      setEmployee({
        empEmail: '',
        empPassword: '',
        empId: '',
        empName: '',
        supervisorName: '',
        amdocsExperience: '',
        totalExperience: '',
        amdocsJourney: '',
        functionalKnowledge: [],
        primaryTechSkill: [],
        primaryProductSubdomain: [],
        secondaryTechSkill: '',
        secondaryProduct: '',
        devOpsKnowledge: '',
        mentoringAbility: false,
        explorationInterest: false,
        contributedToDesign: false,
        engagementActivityContribution: false,
        presentationSkills: '',
        hobbiesSports: '',
        additionalInfo: '',
      });

      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Update Employee Information</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        {[
          { label: 'Email', name: 'empEmail', type: 'email', value: employee.empEmail },
          { label: 'Employee ID', name: 'empId', type: 'text', value: employee.empId },
          { label: 'Name', name: 'empName', type: 'text', value: employee.empName },
          { label: 'Supervisor Name', name: 'supervisorName', type: 'text', value: employee.supervisorName },
          { label: 'Amdocs Experience', name: 'amdocsExperience', type: 'number', value: employee.amdocsExperience },
          { label: 'Total Experience', name: 'totalExperience', type: 'number', value: employee.totalExperience },
          { label: 'Amdocs Journey', name: 'amdocsJourney', type: 'text', value: employee.amdocsJourney },
          { label: 'Functional Knowledge', name: 'functionalKnowledge', type: 'text', value: employee.functionalKnowledge.join(',') },
          { label: 'Functional Knowledge', name: 'functionalKnowledge', type: 'text', value: employee.primaryTechSkill.join(',') },
          { label: 'Functional Knowledge', name: 'functionalKnowledge', type: 'text', value: employee.primaryProductSubdomain.join(',') },
          { label: 'Secondary Tech Skills', name: 'secondaryTechSkill', type: 'text', value: employee.secondaryTechSkill },
          { label: 'Secondary Product/Subdomain', name: 'secondaryProduct', type: 'text', value: employee.secondaryProduct },
          { label: 'Devops Knowledge', name: 'devOpsKnowledge', type: 'text', value: employee.devOpsKnowledge },
          { label: 'Presentation Skills', name: 'presentationSkills', type: 'number', value: employee.presentationSkills },
          { label: 'Hobbies', name: 'hobbiesSports', type: 'text', value: employee.hobbiesSports },
          { label: 'Additional Info', name: 'additionalInfo', type: 'text', value: employee.additionalInfo },
        ].map(({ label, name, type, value }) => (
          <div key={name} className="form-field">
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={handleChange} required />
          </div>
        ))}
        {/* {[
          { label: 'Mentoring Ability', name: 'mentoringAbility', type: 'checkbox', value: employee.mentoringAbility },
          { label: 'Expploration Interest', name: 'explorationInterest', type: 'checkbox', value: employee.explorationInterest },
          { label: 'Contributed To Design', name: 'contributedToDesign', type: 'checkbox', value: employee.contributedToDesign },
          { label: 'Engagement Acitivity Contribution', name: 'engagementActivityContribution', type: 'checkbox', value: employee.engagementActivityContribution },
        ].map(({ label, name, type, value }) => (
          <div key={name} className="form-checkbox">
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={handleChange} required />
          </div>
        ))} */}
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UpdateEmployee;
