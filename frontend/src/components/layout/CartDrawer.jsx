import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CartProduct from '../cart/CartProduct'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../../redux/slices/cartSlice'
const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const dispatch = useDispatch()
    const { user, guestId } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)
    const userId = user ? user._id : null
    const navigate = useNavigate()
    const handleCheckout = () => {
        toggleCartDrawer()
        if (!user) {
            navigate('/login?redirect=checkout')
        } else {

            navigate("/checkout")
        }
    }
    return (
        <div className={`fixed flex flex-col top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-[30rem] shadow-lg bg-white transform transition-transform duration-300 z-50 ${drawerOpen ? " translate-x-0 " : "translate-x-full "}`}>
            <div className='flex justify-end p-4'>
                <button onClick={toggleCartDrawer} >
                    <IoMdClose className='w-5 h-5 text-gray-600' />
                </button>
            </div>

            {/* CART CONTENT */}
            <div className='flex-grow overflow-y-auto p-4'>
                <h2 className='text-xl mb-4 font-semibold'>Your Cart</h2>
                {cart && cart.products?.length > 0 ? (<CartProduct cart={cart} userId={userId} guestId={guestId} />) : (<p>Your cart is empty.</p>)}

            </div>


            {/* CHECKOUT BUTTON */}
            <div className=' p-4 bg-white sticky bottom-0'>
                {cart && cart.products?.length > 0 && (
                    <>
                        <button onClick={handleCheckout} className='bg-black w-full rounded-lg font-semibold py-3 text-white hover:bg-gray-800 transition'>CheckOut</button>
                        <p className='text-gray-700 text-xs tracking-tighter text-center mt-2'>Shipping, Taxes, and Discount calculated at Checkout</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default CartDrawer