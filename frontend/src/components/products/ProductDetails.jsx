import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ProductGrid from './ProductGrid'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice'
import { addToCart } from '../../redux/slices/cartSlice'


const ProductDetails = ({ productId }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { selectedProduct, similarProducts, loading, error } = useSelector((state) => state.products);
    const { user, guestId } = useSelector((state) => state.auth)

    const [mainImage, setMainImage] = useState("")


    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const productFetchId = productId || id


    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails( productFetchId ))
            dispatch(fetchSimilarProducts( productFetchId ))
        }
    }, [dispatch, productFetchId])

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0]?.url)
        }
    }, [selectedProduct])
    const handleQuantity = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1)
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1)
    }

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select color & size before adding to cart", { duration: 1000 })
            return
        }
        setIsButtonDisabled(true)

        dispatch(addToCart({
            productId: productFetchId,
            quantity,
            size: selectedSize,
            color: selectedColor,
            guestId,
            userId: user?._id
        })).then(() => {
            toast.success("Product added to cart", { duration: 1000 })
        }).finally(() => {
            setIsButtonDisabled(false)
        })
    }
    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error:{error}</p>
    }
    return (
        <div className='p-6'>
            {selectedProduct && (
                <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                    <div className='flex flex-col md:flex-row '>
                        {/* LEFT THUMBNAILS */}
                        <div className='hidden md:flex flex-col space-y-4 mr-6'>
                            {selectedProduct.images.map((images, index) => {
                                return <img
                                    onClick={() => { setMainImage(images.url) }}
                                    key={index}
                                    src={images.url}
                                    alt={images.altText || `Thumbnail ${index}`}
                                    className={`w-20 h-20 object-cover cursor-pointer border rounded-lg ${mainImage === images.url ? "border-black" : "border-gray-300"}`} />
                            })}
                        </div>
                        {/* MAIN IMAGE */}
                        <div className='md:w-1/2'>
                            <div className='mb-4'>
                                <img src={mainImage || null} alt="Main Product Image"
                                    className='w-full h-auto rounded-lg object-cover' />
                            </div>
                        </div>

                        {/* MOBILE THUMBNAIL */}
                        <div className='md:hidden flex flex-row mb-4 overflow-x-scroll space-x-4'>
                            {selectedProduct.images.map((images, index) => {
                                return <img key={index}
                                    onClick={() => { setMainImage(images.url) }}
                                    src={images.url}
                                    alt={images.altText || `Thumbnail ${index}`}
                                    className={`w-20 h-20 object-cover cursor-pointer border rounded-lg ${mainImage === images.url ? "border-black" : "border-gray-300"}`} />
                            })}
                        </div>
                        {/* RIGHT SECTION */}
                        <div className='md:w-1/2 md:ml-10'>
                            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name}</h1>
                            <p className='text-lg line-through mb-1 text-gray-600'>
                                {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                            </p>
                            <p className='text-xl text-gray-500 mb-2'>&#8377;{selectedProduct.price}</p>
                            <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>
                            {/* COLORS */}
                            <div className='mb-4'>
                                <p className='text-gray-700'>Color</p>
                                <div className='flex gap-2 mt-2'>
                                    {selectedProduct.colors.map((color, index) => {
                                        return <button key={index}
                                            onClick={() => setSelectedColor(color)}
                                            // className={` w-8 h-8 rounded-full ${selectedColor === color ? "ring-2 ring-offset-1 ring-black" : " "}`}
                                            // style={{
                                            //     backgroundColor: color.toLowerCase(),
                                            //     filter: "brightness(0.5)"
                                            // }}>
                                            className={`border px-4 py-2 rounded ${selectedColor === color ? "bg-black text-white" : "text-gray-900"}`}>{color}
                                        </button>
                                    })}
                                </div>
                            </div>

                            {/* SIZES */}
                            <div className='mb-4'>
                                <p className='text-gray-700'>Size</p>
                                <div className='flex gap-2 mt-2'>
                                    {selectedProduct.sizes.map((size, index) => {
                                        return <button
                                            onClick={() => setSelectedSize(size)}
                                            key={index}
                                            className={`border px-4 py-2 rounded ${selectedSize === size ? "bg-black text-white" : "text-gray-900"}`}>{size}</button>
                                    })}
                                </div>
                            </div>
                            {/* QUANTITY */}
                            <div className="mb-6">
                                <p className="text-gray-700">Quantity</p>
                                <div className='flex items-center space-x-2 mt-2'>
                                    <button onClick={() => handleQuantity("minus")} className='px-2 py-1 rounded-l border bg-gray-200 text-lg'>-</button>
                                    <span className='text-lg'>{quantity}</span>
                                    <button onClick={() => handleQuantity("plus")} className='px-2 py-1 rounded-r border bg-gray-200 text-lg'>+</button>
                                </div>
                            </div>
                            {/* ADD TO CART */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isButtonDisabled}
                                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}>
                                {isButtonDisabled ? "Adding..." : "ADD TO Cart"}
                            </button>

                            {/* CHARATERISTICS */}
                            <div className='mt-10'>
                                <h3 className='text-gray-700 font-semibold '>Characteristics:</h3>
                                <table className='w-full text-sm mt-2 text-gray-600'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Brand</td>
                                            <td className='py-1'>{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Material</td>
                                            <td className='py-1'>{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    {/* YOU MAY ALSO LIKE SECTION */}
                    <div className='mt-20'>
                        <h2 className='text-2xl font-medium text-center mb-4 '>You May Also Like</h2>
                        <ProductGrid products={similarProducts} loading={loading} error={error} />
                    </div>
                </div>
            )}

        </div>
    )
}

export default ProductDetails