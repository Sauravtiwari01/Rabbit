import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import register from "../assets/register.webp"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/slices/authSlice'
import { mergeCart } from '../redux/slices/cartSlice'



const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const { cart } = useSelector((state) => state.cart)
    const { user, guestId, loading } = useSelector((state) => state.auth)
    const location = useLocation()
    const navigate = useNavigate()

    // check for redirect parameter if its checkout or other
    const redirect = new URLSearchParams(location.search).get('redirect') || "/"
    const isRedirectCheckout = redirect.includes('checkout')

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isRedirectCheckout ? '/checkout' : '/')
                })
            } else {
                navigate(isRedirectCheckout ? '/checkout' : '/')
            }
        }
    }, [user, guestId, isRedirectCheckout, navigate, dispatch, cart])



    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser({ name, email, password }))
    }
    return (
        <div className='flex '>
            <div className='w-full flex flex-col md:w-1/2 p-8 justify-center items-center md:p-10'>
                <form onSubmit={handleSubmit} className='rounded-lg w-full max-w-md p-8 bg-white shadow-sm border'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>Rabbit</h2>
                    </div>
                    <h2 className='text-2xl text-center font-bold mb-6'>Hey There!👋🏻</h2>
                    <p className='mb-6 text-center'>Enter your email and password to Login.</p>
                    {/* INPUT NAME */}
                    <div className='mb-4'>
                        <label className='block text-sm mb-2 font-semibold'>Name</label>
                        <input type="text" name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border p-2 rounded w-full'
                            placeholder='Enter your Name' />
                    </div>
                    {/* INPUT EMAIL */}
                    <div className='mb-4'>
                        <label className='block text-sm mb-2 font-semibold'>Email</label>
                        <input type="email" name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border p-2 rounded w-full'
                            placeholder='Enter your email' />
                    </div>
                    {/* INPUT password */}
                    <div className='mb-4'>
                        <label className='block text-sm mb-2 font-semibold'>Password</label>
                        <input type="password" name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border p-2 rounded w-full'
                            placeholder='Enter your password' />
                    </div>
                    <button type="submit" className='bg-black text-white p-2 w-full rounded-lg hover:bg-gray-800 font-semibold'>
                        {loading ? "Signing up..":"Sign Up"}
                    </button>
                    <p className='mt-6 text-center text-sm'>Have an account?
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500 ' > Login</Link>
                    </p>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col items-center justify-center'>
                    <img src={register} alt="Login To Account" className='h-[650px] w-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default Register