import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/layout/Landing';
import AdminLogin from './components/admin/AdminLogin';
import EmployeeLogin from './components/employee/EmployeeLogin';
import EmployeeRegister from './components/employee/EmployeeRegister';
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';

function App() {
  return (
    <Router>
      {/* Landing Page */}
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/adminLogin' element={<AdminLogin />}/>
        <Route path='/employeeLogin' element={<EmployeeLogin />}/>
        <Route path='/employeeRegister' element={<EmployeeRegister />}/>
        <Route path='/adminDashboard' element={<AdminDashboard />}/>
        <Route path='/employeeDashboard' element={<EmployeeDashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
