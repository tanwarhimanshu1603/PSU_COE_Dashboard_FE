import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import Login from './components/account/Login';
import UpdateEmployee from './components/employee/UpdateEmployee';
import { useEffect } from 'react';
import Register from './components/account/Register';
import Dashboard from './components/employee/Dashboard';
function App() {

  return ( 
    <Router>
      {/* Landing Page */}
      <Routes>
        <Route path='/' element={<Login />}/>
        {/* <Route path='/' element={<AdminNavBar />}/> */}
        <Route path='/admin/*' element={<AdminDashboard />}/>
        {/* <Route path='/search' element={<Search />}/> */}
        <Route path='/adminDashboard' element={<AdminDashboard />}/>
        <Route path='/employeeDashboard' element={<EmployeeDashboard />}/>
        <Route path='/updateEmployee' element={<UpdateEmployee />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
