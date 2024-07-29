import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
export default function Home() {
  return (
    <div>
      <AdminDashboard />
      <Outlet /> 
    </div>
  )
}
// src/Component/Admin/AdminLayout.js

