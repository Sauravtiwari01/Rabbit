import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/slices/cartSlice'

const OrderConfirmationPage = () => {
    const calculatedEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt)
        orderDate.setDate(orderDate.getDate() + 10)
        return orderDate.toLocaleDateString("en-GB")
    }

    const { checkout } = useSelector((state) => state.checkout)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // clear cart when order confirmed
    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart())
            localStorage.removeItem('cart')
        } else {

            navigate("/my-orders")
        }
    }, [navigate, dispatch, checkout])

    return (
        <div className='max-w-4xl mx-auto p-6 bg-white'>
            <h1 className='font-bold text-center text-emerald-700 mb-8 text-4xl'>Thank you for your order</h1>
            {checkout && <div className='rounded-lg p-6 border'>
                <div className="flex justify-between mb-20">
                    {/* ORDER ID & DATE */}
                    <div>
                        <h2 className="text-xl font-semibold">Order ID: {checkout._id}</h2>
                        <p className="text-gray-500">Order Date: {new Date(checkout.createdAt).toLocaleDateString("en-GB")}</p>
                    </div>
                    {/* ESTIMATED DELIVERY */}
                    <div>
                        <p className="text-sm text-emerald-700">Estimated delivery: {calculatedEstimatedDelivery(checkout.createdAt)}</p>
                    </div>
                </div>
                <div className="mb-20">
                    {checkout.checkoutItems.map((product, index) => (
                        <div key={index} className='flex items-center mb-4 '>
                            <img src={product.image} alt={product.name} className='w-16 h-16 rounded-md mr-4 object-cover' />
                            <div className=''>
                                <h4 className='text-md font-semibold'>{product.name}</h4>
                                <p className='text-sm text-gray-500'>{product.color} | {product.size}</p>
                            </div>

                            <div className='ml-auto text-right'>
                                <p className='text-md'>&#8377;{product.price?.toLocaleString()}</p>
                                <p className='text-gray-500 text-sm'>Qty: {product.quantity}</p>
                            </div>

                        </div>
                    ))}
                </div>
                {/* PAYMENT AND DELIVERY INFO */}
                <div className="grid grid-cols-2 gap-8">
                    {/* PAYMENT */}
                    <div>
                        <h4 className='text-lg mb-2 font-semibold'>Payment</h4>
                        <p className="text-gray-600">Paypal</p>
                    </div>
                    {/* DELIVERY */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                        <p className="text-gray-600">{checkout.shippingAddress.address}</p>
                        <p className="text-gray-600">{checkout.shippingAddress.city},{" "} {checkout.shippingAddress.country}</p>
                    </div>
                </div>

            </div>}
        </div>
    )
}

export default OrderConfirmationPage