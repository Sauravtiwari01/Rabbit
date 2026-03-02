import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'
import { clearCart } from '../../redux/slices/cartSlice'
const AdminSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearCart())
        navigate("/")
    }
    return (
        <div className='p-6'>
            <div className="mb-6">
                <Link to="/admin" className='font-medium text-xl'>Rabbit</Link>
            </div>
            <h2 className='font-medium text-xl mb-6 text-center'>Admin Dashboard</h2>
            <nav className='flex flex-col space-y-2'>
                <NavLink className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"} to="/admin/users">
                    <FaUser />
                    <span>Users</span>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"} to="/admin/products">
                    <FaBoxOpen />
                    <span>Products</span>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"} to="/admin/orders">
                    <FaClipboardList />
                    <span>Orders</span>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"} to="/">
                    <FaStore />
                    <span>Shop</span>
                </NavLink>

            </nav>
            <div className="mt-6" ></div>
            <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white rounded w-full py-2 px-4 flex items-center justify-center space-x-2'>
                <FaSignOutAlt />
                <span>Logout</span>
            </button>
        </div>
    )
}

export default AdminSidebar