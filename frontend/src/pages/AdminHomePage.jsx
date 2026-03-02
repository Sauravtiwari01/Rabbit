import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllOrders } from '../redux/slices/adminOrderSlice'
import { fectchAdminProducts } from '../redux/slices/adminProductSlice'

const AdminHomePage = () => {
    const dispatch = useDispatch()
    const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector((state) => state.adminOrders)
    const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts)

    useEffect(() => {
        dispatch(fectchAdminProducts())
        dispatch(fetchAllOrders())
    }, [dispatch])


    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h1 className='font-bold text-3xl mb-6'>Admin Dashboard</h1>
            {productsLoading || ordersLoading ? (
                <p>Loading..</p>
            ) : productsError ? (
                <p className='text-red-500'>Error fetching products:{productsError}</p>
            ) : ordersError ? (
                <p className='text-red-500'>Error fetching Orders:{ordersError}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 shadow-md rounded-lg">
                        <h2 className='font-semibold text-xl'>Revenue</h2>
                        <h3 className='text-2xl  '>&#8377;{totalSales.toFixed(2)}</h3>
                    </div>
                    <div className="p-4 shadow-md rounded-lg">
                        <h2 className='font-semibold text-xl'>Total Orders</h2>
                        <h3 className='text-2xl  '>{totalOrders}</h3>
                        <Link className='text-blue-500 hover:underline' to="/admin/orders">Manage Orders</Link>
                    </div>
                    <div className="p-4 shadow-md rounded-lg">
                        <h2 className='font-semibold text-xl'>Total Products</h2>
                        <h3 className='text-2xl  '>{products.length}</h3>
                        <Link className='text-blue-500 hover:underline' to="/admin/products">Manage Products</Link>
                    </div>
                </div>
            )}
            <div className='mt-6'>
                <h2 className='font-bold text-2xl mb-4'>Recent Orders</h2>
                <div className="overflow-x-auto"></div>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-200 text-xs text-gray-700 uppercase'>
                        <tr >
                            <th className='text-start py-3 px-4'>ORDER ID</th>
                            <th className='text-start py-3 px-4'>USER</th>
                            <th className='text-start py-3 px-4'>TOTAL PRICE</th>
                            <th className='text-start py-3 px-4'>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ?
                            (
                                orders.map((order) => (
                                    <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                        <td className='py-2 font-semibold'>{order._id}</td>
                                        <td className='py-2 text-gray-500'>{order.user.name}</td>
                                        <td className='py-2 text-gray-500'>&#8377;{order.totalPrice.toFixed(2).toLocaleString()}</td>
                                        <td className='py-2 text-gray-500'>{order.status}</td>
                                    </tr>
                                ))
                            )
                            : (
                                <tr className='text-center bg-gray-100'>
                                    <td colSpan={4} className='p-4 text-center text-gray-500'>No recent orders found</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminHomePage