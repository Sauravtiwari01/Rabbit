import React from 'react'
import { Link } from 'react-router-dom'


const ProductGrid = ({ products, loading, error }) => {
    if (loading) {
        return <p>Loading...</p>
    }
    
    if (error) {
        return <p>Error:{error}</p>
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {products.map((product, index) => {
                return <Link key={index} to={`/product/${product._id}`} className='block'>
                    <div className='p-4 bg-white rounded-lg'>
                        <div className='w-full  h-96 mb-4'>
                            <img className='w-full h-full border object-cover rounded-lg'
                                src={product.images[0].url} alt={product.images[0].altText || product.name} />
                        </div>
                        <p className='text-sm mb-2'>{product.name}</p>
                        <p className='text-gray-500 tracking-tighter text-sm font-medium'>&#8377;{product.price}</p>
                    </div>
                </Link>
            })}

        </div>
    )
}

export default ProductGrid