import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteProduct, fectchAdminProducts } from '../../redux/slices/adminProductSlice'

const ProductManagement = () => {
    const { products, loading, error } = useSelector((state) => state.adminProducts)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fectchAdminProducts())
    }, [dispatch])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id))

        }
    }
    return (
        <div className='p-6 max-w-7xl mx-auto'>
            <h2 className='text-2xl font-bold mb-6'>Product Management</h2>
            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='uppercase text-xs bg-gray-100 text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>price</th>
                            <th className='py-3 px-4'>sku</th>
                            <th className='py-3 px-4'>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className='hover:bg-gray-50 border-b cursor-pointer'>
                                    <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{product.name}</td>
                                    <td className='p-4'>&#8377;{product.price?.toLocaleString()}</td>
                                    <td className='p-4'>{product.sku}</td>
                                    <td className='p-4'>

                                        <Link to={`/admin/products/${product._id}/edit`} className='bg-yellow-500 mr-2 rounded text-white hover:bg-yellow-600 text-xs py-1 px-2'>Edit</Link>
                                        <button onClick={() => handleDelete(product._id)} className='bg-red-500 rounded text-white hover:bg-red-600 text-xs py-1 px-2'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className='hover:bg-gray-50 border-b'>
                                <td colSpan={4} className='p-4 text-center text-gray-500'>No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ProductManagement