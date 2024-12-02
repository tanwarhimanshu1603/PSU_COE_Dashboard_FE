import React from 'react'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
    
    const { empId } = useParams();
    console.log(empId)
  return (
    <div> <h1>Profile Page of employee {empId}</h1></div>
  )
}

export default ProfilePage