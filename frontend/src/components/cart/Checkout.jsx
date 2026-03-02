import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayPalButton from './PayPalButton'
import { useDispatch, useSelector } from 'react-redux'
import { createCheckout } from '../../redux/slices/checkoutSlice'
import axios from 'axios'


const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart, loading, error } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const [checkoutId, setCheckoutId] = useState()
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    })

    // ensure cart is loaded before proceeding
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate('/')
        }
    }, [navigate, cart])
    const handleCreateCheckout = async (e) => {
        e.preventDefault()
        if (cart && cart.products.length > 0) {
            const res = await dispatch(createCheckout({
                checkoutItems: cart.products,
                shippingAddress,
                paymentMethod: 'PayPal',
                totalPrice: cart.totalPrice
            }))
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id)
            }
        }
    }
    const handlePaymentSuccess = async (details) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, {
                paymentStatus: "paid", paymentDetails: details
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            })
            await handleFinalizeCheckout(checkoutId)
        } catch (error) {
            console.error(error);
        }

    }

    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            })
            navigate("/order-confirmation")
        } catch (error) {
            console.error(error);
        }
    }
    if (loading) {
        return <p>Loading cart...</p>
    }
    if (error) {
        return <p>Error loading the cart!:{error}</p>
    }
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty.</p>
    }
    return (
        <div className=' mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl py-10 px-6 tracking-tighter'>
            {/* CHECKOUT DETAILS */}
            <div className='bg-white rounded-lg p-6 '>
                <h2 className='mb-6 text-2xl'>CHECKOUT</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className=' text-lg mb-4'>Contact Details</h3>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Email</label>
                        <input type="email" name="email"
                            disabled
                            value={user ? user.email : ""}
                            className='rounded p-2 border w-full ' />
                    </div>
                    <h3 className='text-lg mb-4'>Delivery</h3>

                    <div className='mb-4 grid grid-cols-2 gap-8 '>

                        <div>
                            <label className='block text-gray-700'>First name</label>
                            <input type="text" name="firstName" id="firstName"
                                className='rounded p-2 border w-full'
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                value={shippingAddress.firstName}
                                required />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Last name</label>
                            <input type="text" name="lastName" id="lastName"
                                className='rounded p-2 border w-full'
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                value={shippingAddress.firstName}
                                required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Address</label>
                        <input type="text" value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            name="address" id="address"
                            className='rounded p-2 border w-full' required />
                    </div>

                    <div className='mb-4 grid grid-cols-2 gap-8 '>
                        <div>
                            <label className='block text-gray-700'>City</label>
                            <input type="text" name="city" id="city"
                                className='rounded p-2 border w-full'
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                value={shippingAddress.city}
                                required />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Postal Code</label>
                            <input type="text" name="postalCode" id="postalCode"
                                className='rounded p-2 border w-full'
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                value={shippingAddress.postalCode}
                                required />
                        </div>
                    </div>


                    <div className="mb-4">
                        <label className='block text-gray-700'>Country</label>
                        <input type="text" value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            name="country" id="country"
                            className='rounded p-2 border w-full' required />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Phone</label>
                        <input type="tel" value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            name="phone" id="phone"
                            className='rounded p-2 border w-full' required />
                    </div>
                    <div className='mt-6'>
                        {!checkoutId ? (<button type='submit' className='bg-black text-white rounded w-full py-3'>Continue to payment</button>) : (
                            <div>
                                <h3 className='text-lg mb-4'>Pay with PayPal</h3>
                                {/* Paypal button */}
                                <PayPalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={(err) => alert("Payment failed. Try again")} />
                            </div>
                        )}

                    </div>

                </form>

            </div>
            {/* ORDER SUMMARY */}
            <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='mb-4 text-lg'>Order Summary</h3>
                <div className='mb-4 py-4 border-t'>
                    {cart.products.map((product, index) => {
                        return <div className='flex items-start justify-between border-b py-2' key={index}>
                            <div className="flex items-start">
                                <img src={product.image} alt={product.name} className='w-20 h-24 mr-4 object-cover' />
                                <div>
                                    <h3 className='text-md'>{product.name}</h3>
                                    <p className='text-gray-500'>Size: {product.size}</p>
                                    <p className='text-gray-500'>Size: {product.color}</p>
                                </div>
                            </div>
                            <p className='text-xl'>&#8377;{product.price?.toLocaleString()}</p>
                        </div>
                    })}
                </div>
                <div className="flex justify-between items-center mb-4 text-lg">
                    <p>Subtotal</p>
                    <p>&#8377;{cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center mb-4 text-lg">
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t text-lg">
                    <p>Total</p>
                    <p>&#8377;{cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>

        </div>
    )
}

export default Checkout