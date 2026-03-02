import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchOrderDetails } from '../redux/slices/orderSlice'

const OrderDetails = () => {
    const { id } = useParams()
    const { orderDetails, loading, error } = useSelector((state) => state.orders)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrderDetails(id))
    }, [dispatch,id])
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error:{error}</p>
    return (
        <div className='mx-auto max-w-7xl p-4 sm:p-6'>
            <h2 className='font-bold md:text-3xl text-2xl mb-6'>Order Details</h2>
            {!orderDetails ? (<p>No order Details Found</p>) : (
                <div className="border p-4 sm:p-6 rounded-lg">
                    {/* order info */}
                    <div className="flex flex-col sm:flex-row justify-between mb-8">
                        <div>
                            <h3 className="font-semibold text-l md:text-xl ">Order ID: #{orderDetails._id} </h3>
                            <p className='text-gray-600'>Order date: {new Date(orderDetails.createdAt).toLocaleDateString("en-GB")}</p>
                        </div>
                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} text-sm mb-4 font-medium py-1 px-3 rounded-full`}>{orderDetails.isPaid ? "Approved" : "Pending"}</span>
                            <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} text-sm mb-4 font-medium py-1 px-3 rounded-full`}>{orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}</span>
                        </div>
                    </div>
                    {/* CUSTOMER PAYMENT SHIPPING INFO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Payment Info</h4>
                            <p>Payment Method: {orderDetails.paymentMethod}</p>
                            <p>Status : {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Shipping Info</h4>
                            <p>Shipping Method: {orderDetails.shippingMethod}</p>
                            <p>Address : {`${orderDetails.shippingAddress.city} , ${orderDetails.shippingAddress.country}`}</p>
                        </div>
                    </div>
                    {/* PRODUCT LIST */}
                    <div className="overflow-x-auto">
                        <h4 className="text-lg font-semibold mb-4">Products</h4>
                        <table className="min-w-full text-gray-600 mb-4">
                            <thead className='bg-gray-100 '>
                                <tr className='text-left'>
                                    <th className="py-2 px-4 ">Name</th>
                                    {/* <th className="py-2 px-4">Unit price</th> */}
                                    <th className="py-2 px-4">Quantity</th>
                                    <th className="py-2 px-4">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className='border-b'>
                                        <td className="py-2 px-4 flex items-center">
                                            <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded-lg mr-4' />
                                            <Link to={`/product/${item.productId}`} className='text-blue-500 hover:underline'>{item.name}</Link>
                                        </td>
                                        {/* <td className="py-2 px-4">&#8377;{item.price}</td> */}
                                        <td className="py-2 px-4">{item.quantity}</td>
                                        <td className="py-2 px-4">&#8377;{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* BACK TO MY ORDERS */}
                    <Link to="/my-orders" className='text-blue-500 hover:underline'>Back to My Orders</Link>
                </div>
            )}

        </div>
    )
}

export default OrderDetails