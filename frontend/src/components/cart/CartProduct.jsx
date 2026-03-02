import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri"
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice'
const CartProduct = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch()
    // handle update quantity in cart
    const handleUpdateQuantity = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity: newQuantity,
                guestId,
                userId,
                color,
                size
            }))
        }
    }

    // handle remove from cart
    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({
            productId, guestId,
            userId, size, color
        }))
    }

    return (
        <div>
            {cart.products.map((product, index) => {
                return <div key={index} className='flex items-start border-b justify-between py-4'>
                    {/* PRODUCT IMAGE */}
                    <div className='flex items-start '>
                        <img src={product.image} alt={product.name} className='w-20 h-24 rounded mr-4 object-cover' />

                        {/* PRODUCT DETAILS */}
                        <div className=''>
                            <h3 >{product.name}</h3>
                            <p className='text-sm text-gray-700'>size: {product.size} | color: {product.color}</p>
                            <div className='flex items-center mt-2'>
                                <button onClick={() => handleUpdateQuantity(product.productId, -1, product.quantity, product.size, product.color)} className='border text-xl border-gray-300 px-2 py-1'>-</button>
                                <span className='mx-4'>{product.quantity}</span>
                                <button onClick={() => handleUpdateQuantity(product.productId, 1, product.quantity, product.size, product.color)} className='border text-xl border-gray-300 px-2 py-1'>+</button>
                            </div>
                        </div>
                    </div>
                    {/* PRICE  */}
                    <div className='flex flex-col items-end'>
                        <p className='font-medium'>&#8377;{product.price.toLocaleString()}</p>
                        <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}><RiDeleteBin3Line className='h-5 w-5 mt-2 text-red-500 ' /></button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default CartProduct