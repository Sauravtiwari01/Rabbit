import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from './SearchBar';
import CartDrawer from '../layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0

    function toggleCartDrawer() {
        setDrawerOpen(!drawerOpen)

    }
    const [mobileNavDrawerOpen, setMobileNavDrawerOpen] = useState(false)
    function toggleMobileNavDrawer() {
        setMobileNavDrawerOpen(!mobileNavDrawerOpen)
    }
    return (
        <>
            <nav>
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    {/* LEFT - LOGO */}
                    <div>
                        <Link to="/" className='text-2xl font-medium'>Rabbit</Link>
                    </div>
                    {/* CENTER - NAV LINKS */}
                    <div className='hidden md:flex space-x-6'>
                        <Link to="/collections/all?gender=Men" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>men</Link>
                        <Link to="/collections/all?gender=Women" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>women</Link>
                        <Link to="/collections/all?category=Top Wear" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>top wear</Link>
                        <Link to="/collections/all?category=Bottom Wear" className='text-gray-700 hover:text-black font-medium text-sm uppercase'>bottom wear</Link>
                    </div>
                    {/* RIGHT - ICONS */}
                    <div className='flex items-center space-x-4'>
                        {user && user.role === "admin" && (<Link to="/admin" className='block bg-black text-white text-xs px-2 rounded'>Admin</Link>)}

                        <Link to="/profile" className='hover:text-black'>
                            <HiOutlineUser className='text-gray-700 h-5 w-5' />
                        </Link>
                        <button onClick={toggleCartDrawer} className='relative hover:text-black'>
                            <HiOutlineShoppingBag className="text-gray-700 h-5 w-5" />
                            {cartItemCount > 0 && (<span className='absolute -top-1 text-xs text-white bg-rabbit-red rounded-full py-0.5 px-1 '>{cartItemCount}</span>)}

                        </button>
                        {/* SEARCH ICON */}
                        <div className='overflow-hidden'>
                            <SearchBar />
                        </div>
                        {/* MOBILE-MENU */}
                        <button className='md:hidden' onClick={toggleMobileNavDrawer} ><HiBars3BottomRight className='h-5 w-5 text-gray-700' /></button>
                    </div>
                </div>
            </nav>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
            {/* MOBILE MENU */}
            <div className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 md:w-2/4 shadow-lg transform z-50 transition-transform duration-300 bg-white ${mobileNavDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={toggleMobileNavDrawer}><IoMdClose className='w-5 h-5 text-gray-700 hover:text-black' /></button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold text-gray-500 mb-2'>Menu</h2>
                    <nav className='space-y-4'>
                        <Link to="/collections/all?gender=Men" onClick={toggleMobileNavDrawer} className='block uppercase border-b text-gray-700 hover:text-black  mb-2'>Men</Link>
                        <Link to="/collections/all?gender=Women" onClick={toggleMobileNavDrawer} className='block uppercase border-b text-gray-700 hover:text-black  mb-2'>woMen</Link>
                        <Link to="/collections/all?category=Top Wear" onClick={toggleMobileNavDrawer} className='block uppercase border-b text-gray-700 hover:text-black  mb-2'>topwear</Link>
                        <Link to="/collections/all?category=Bottom Wear" onClick={toggleMobileNavDrawer} className='block uppercase border-b text-gray-700 hover:text-black  mb-2'>bottomwear</Link>

                    </nav>
                </div>
            </div>
        </>
    )
}

export default NavBar