import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
        {/* Route to /adminLogin */}
        <Link to="/adminLogin"><button>Admin Login</button></Link>
        
        {/* Route to /employeeLogin */}
        <Link to="/employeeLogin"><button>Employee Login</button></Link>
        {/* Route to /employeeRegister */}
        <Link to="/employeeRegister"><button>Employee Register</button></Link>
    </div>
  )
}

export default Landing