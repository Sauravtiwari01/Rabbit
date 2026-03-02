import React from 'react'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandInstagram, TbBrandMeta, TbPhoneCall, TbPhoneCheck, TbPhoneIncoming } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='border-t py-12'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-6 '>
                {/* NEWSLETTER */}
                <div className=''>
                    <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                    <p className='text-gray-500 mb-4'>Be the first to hear about new products, exclusive events, online offers.</p>
                    <p className='font-medium text-sm text-gray-600 mb-6'>Sign up and get 10% off your first order.</p>
                    <form className='flex'>
                        <input className='w-full p-3 text-sm border-t border-l border-b border-gray-300 rounded-l-md focus-within:ring-2 focus:ring-gray-500 focus:outline-none transition-all' type="email" name="email" id="" placeholder='Enter your email' required />
                        <button className=' rounded-r-md bg-black text-white text-sm px-6 py-3 hover:border-gray-800 transition-all' type='submit'>Subscribe</button>
                    </form>
                </div>
                {/* SHOP LINKS */}
                <div className='flex flex-col'>
                    <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                    <Link to="" className='text-sm mb-2 text-gray-700 hover:text-black'>Men's Top Wear</Link>
                    <Link to="" className='text-sm mb-2 text-gray-700 hover:text-black'>Men's Bottom Wear</Link>
                    <Link to="" className='text-sm mb-2 text-gray-700 hover:text-black'>Women's Top Wear</Link>
                    <Link to="" className='text-sm mb-2 text-gray-700 hover:text-black'>Women's Bottom Wear</Link>
                </div>
                {/* CONTACT LINKS */}
                <div className='flex flex-col'>
                    <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                    <Link to="" className='text-sm mb-2 text-gray-700 hover:text-black'>Contact US</Link>
                    <Link to="" className='text-sm mb-2 text-gray-700 hover:text-black'>About Us</Link>
                    <Link to="" className='text-sm mb-2 text-gray-700 hover:text-black'>FAQs</Link>
                    <Link to="" className='text-sm mb-2 text-gray-700 hover:text-black'>Features</Link>
                </div>
                {/* SOCIAL LINKS */}
                <div className=''>
                    <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                    <div className="flex space-x-4 mb-6 items-center">
                        <a href="www.facebook.com" target='_blank' rel='noreferror noopener' className='hover:text-gray-300'><TbBrandMeta className='h-5 w-d'/></a>
                        <a href="www.instagram.com" target='_blank' rel='noreferror noopener' className='hover:text-gray-300'><TbBrandInstagram className='h-5 w-d'/></a>
                        <a href="www.twitter.com" target='_blank' rel='noreferror noopener' className='hover:text-gray-300'><RiTwitterXLine className='h-5 w-d'/></a>
                    </div>

                    <p className='text-gray-500'>Call us</p>
                    <p ><TbPhoneCall className='inline-block mr-2'/>+91 1234567890</p>
                </div>
            </div>
            {/* COPYRIGHT */}
            <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='tracking-tighter text-sm text-gray-500 text-center'>&copy; 2026, Saurav Tiwari. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer