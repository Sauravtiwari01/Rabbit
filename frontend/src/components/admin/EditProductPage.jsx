import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductDetails } from '../../redux/slices/productsSlice'
import axios from 'axios'
import { updateProduct } from '../../redux/slices/adminProductSlice'

const EditProductPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { selectedProduct, loading, error } = useSelector((state) => state.products)
    const [uploading, setUploading] = useState(false)

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        colors: [],
        sizes: [],
        collections: "",
        material: "",
        gender: "",
        images: []
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setProductData((prevData) => ({ ...prevData, [name]: value }))
    }
    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct)
        }
    }, [selectedProduct])

    const handleArrayChange = (name, value) => {
        setProductData((prev) => ({
            ...prev,
            [name]: value.split(",").map(v => v.trim())
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(id, productData);
        dispatch(updateProduct({ id, productData }))
        navigate("/admin/products")

    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)

        try {
            setUploading(true)
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "" }]
            }))
            setUploading(false)
        } catch (error) {
            console.log(error);
            setUploading(false)
        }
    }
    { loading && <p className="text-sm text-gray-500 mb-2">Updating…</p> }

    if (error) return (<p>Error:{error}</p>)
    return (
        <div className='max-w-5xl shadow-md rounded-md mx-auto p-6'>
            <h2 className='font-bold text-3xl  mb-6'>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div className='mb-6'>
                    <label className="block font-semibold mb-2">Product Name</label>
                    <input type="text" name="name"
                        value={productData.name}
                        onChange={handleChange} className='p-2 rounded-md w-full border border-gray-300 ' required />
                </div>
                {/* DESCRIPTION */}
                <div className='mb-6'>
                    <label className="block font-semibold mb-2">Product Description</label>
                    <textarea rows={4} type="text" name="description"
                        value={productData.description}
                        onChange={handleChange} className='p-2 rounded-md w-full border border-gray-300 ' required />
                </div>
                {/* PRICE INPUT */}
                <div className='mb-6'>
                    <label className="block font-semibold mb-2">Price</label>
                    <input type="number" name="price"
                        value={productData.price}
                        onChange={handleChange} className='p-2 rounded-md w-full border border-gray-300 ' required />
                </div>
                {/* STOCK COUNT */}
                <div className='mb-6'>
                    <label className="block font-semibold mb-2">Count In Stock</label>
                    <input type="number" name="countInStock"
                        value={productData.countInStock}
                        onChange={handleChange} className='p-2 rounded-md w-full border border-gray-300 ' required />
                </div>
                {/* SKU */}
                <div className='mb-6'>
                    <label className="block font-semibold mb-2">SKU</label>
                    <input type="text" name="sku"
                        value={productData.sku}
                        onChange={handleChange} className='p-2 rounded-md w-full border border-gray-300 ' required />
                </div>
                {/* SIZES */}
                <div className='mb-6'>
                    <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
                    <input type="text" name="sizes"
                        value={productData.sizes.join(", ")}
                        onChange={(e) => handleArrayChange("sizes", e.target.value)}
                        className='p-2 rounded-md w-full border border-gray-300 uppercase' required />
                </div>
                {/* COLORS */}
                <div className='mb-6'>
                    <label className="block font-semibold mb-2">Colors (comma-separated)</label>
                    <input type="text" name="colors"
                        value={productData.colors.join(", ")}
                        onChange={(e) => handleArrayChange("colors", e.target.value)}
                        className='p-2 rounded-md w-full border border-gray-300 ' required />
                </div>

                {/* IMAGE UPLOAD */}
                <div className='mb-6'>
                    <label className="block font-semibold mb-2">Upload Images</label>
                    <input type="file" onChange={handleImageUpload} />
                    {uploading && <p>Uploading image...</p>}
                    <div className="flex gap-4 mt-4">
                        {productData.images.map((image, index) => (
                            <div key={index}>
                                <img src={image.url} alt={image.altText || "Product Image"}
                                    className='w-20 h-20 object-cover rounded-md shadow-md' />
                            </div>
                        ))}
                    </div>
                </div>
                <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors" type='submit'>Update Product</button>
            </form>

        </div>
    )
}

export default EditProductPage