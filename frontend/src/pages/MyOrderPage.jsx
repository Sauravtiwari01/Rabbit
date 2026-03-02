import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrderPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { orders, loading, error } = useSelector((state) => state.orders)
    useEffect(() => {
        dispatch(fetchUserOrders())
    },[dispatch])
    const handleOrderClick = (orderId) => {
        navigate(`/order/${orderId}`)
    }
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error:{error}</p>
    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-8'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='uppercase text-xs bg-gray-100 text-gray-700'>
                        <tr>

                            <th className='py-2 px-4 sm:py-3'>Image</th>
                            <th className='py-2 px-4 sm:py-3'>Order ID</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr onClick={() => handleOrderClick(order._id)} key={order._id} className='border-b hover:border-gray-50 cursor-pointer'>

                                    <td className='py-2 px-2 sm:py-2 sm:px-2'>
                                        <img src={order.orderItems[0].image} alt={order.orderItems.name}
                                            className='h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover' />
                                    </td>
                                    <td className='py-2 px-2 sm:py-2 sm:px-2 font-medium text-gray-900 whitespace-nowrap'>
                                        #{order._id}
                                    </td>
                                    <td className='py-2 px-2 sm:py-2 sm:px-2 '>
                                        {new Date(order.createdAt).toLocaleDateString("en-GB")}{" "}
                                        {new Date(order.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                    </td>
                                    <td className='py-2 px-2 sm:py-2 sm:px-2 '>
                                        {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}
                                    </td>
                                    <td className='py-2 px-2 sm:py-2 sm:px-2 '>
                                        {order.orderItems.length}
                                    </td>
                                    <td className='py-2 px-2 sm:py-2 sm:px-2 '>
                                        &#8377;{order.totalPrice}
                                    </td>
                                    <td className='py-2 px-2 sm:py-2 sm:px-2 text-center'>
                                        <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium  ${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='p-4 text-center text-gray-500'>
                                    You have no orders
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default MyOrderPage