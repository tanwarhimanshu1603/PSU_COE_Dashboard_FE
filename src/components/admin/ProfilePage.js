import React from 'react'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
    
    const { empId } = useParams();
    console.log(empId)
  return (
    <div>ProfilePage {empId}</div>
  )
}

export default ProfilePage