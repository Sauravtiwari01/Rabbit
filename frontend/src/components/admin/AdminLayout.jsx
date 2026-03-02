import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link, Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    return (
        <div className='min-h-screen relative flex flex-col md:flex-row'>
            {/* MOBILE TOGGLE BUTTON */}
            <div className="md:hidden p-4 bg-gray-900 text-white flex z-20 ">
                <button onClick={toggleSidebar}>
                    <FaBars size={20} />
                </button>
                <h1 className="font-medium text-xl ml-4">Admin Dashboard</h1>
            </div>
            {/* OVERLAY FOR MOBILE SIDEBAR */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar}></div>
            )}
            {/* SIDEBAR */}
            <div className={`bg-gray-900 absolute md:relative z-20 p-4  text-white w-64 transform transition-transform duration-300 min-h-screen ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}>
                <AdminSidebar />
            </div>
            {/* MAIN CONTENT */}
            <div className="flex-grow p-6 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout