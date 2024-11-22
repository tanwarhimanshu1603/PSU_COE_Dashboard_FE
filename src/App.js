import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import EmployeeRegister from './components/account/EmployeeRegister'
import Login from './components/account/Login';
function App() {
  return ( 
    <Router>
      {/* Landing Page */}
      <Routes>
        <Route path='/' element={<Login />}/>
        {/* <Route path='/' element={<AdminDashboard />}/> */}
        <Route path='/employeeRegister' element={<EmployeeRegister />}/>
        <Route path='/adminDashboard' element={<AdminDashboard />}/>
        <Route path='/employeeDashboard' element={<EmployeeDashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
