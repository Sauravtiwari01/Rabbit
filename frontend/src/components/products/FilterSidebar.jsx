import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {

    const [searchParams, setSearchParms] = useSearchParams()
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 10000
    })
    const [priceRange, setPriceRange] = useState([0, 10000])
    const categories = ["Top Wear", "Bottom Wear"]
    const colors = [
        "Red",
        "Blue",
        "Black",
        "Green",
        "Yellow",
        "Gray",
        "White",
        "Pink",
        "Beige",
        "Navy",
    ]
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    const materials = [
        "Cotton",
        "Denim",
        "Wool",
        "Polyester",
        "Silk",
        "Linen",
        "Viscose",
        "Fleece",
        "Satin"
    ]
    const brands = [
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle",
        "Suit Supply"
    ]
    const genders = ["Men", "Women"]
    const navigate = useNavigate()
    useEffect(() => {
        const params = Object.fromEntries([...searchParams])

        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 10000,
        })
        setPriceRange([0, params.maxPrice || 10000])
    }, [searchParams])

    const handleFilterChange = (e) => {
        let { name, value, checked, type } = e.target
        let newFilters = { ...filters }
        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value]
            } else {
                newFilters[name] = newFilters[name].filter((item) => item != value)
            }
        } else {
            newFilters[name] = value
        }

        setFilters(newFilters)
        // updateURLParams(newFilters)
    }
    const applyFilter = () => {
        let newFilters = { ...filters }
        updateURLParams(newFilters)
    }
    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams()
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","))
            } else if (newFilters[key]) {
                params.append(key, newFilters[key])
            }
        })
        setSearchParms(params)
        navigate(`?${params.toString()}`)
    }

    const handlePriceChange = (e) => {
        let priceRange = e.target.value
        setPriceRange([0, priceRange])
        let newFilters = { ...filters, minPrice: 0, maxPrice: priceRange }
        setFilters(newFilters)
        // updateURLParams(newFilters)
    }

    return (
        <div className='p-4 border-r '>
            <h3 className='text-xl font-medium mb-4 text-gray-800'>Filters</h3>
            <button onClick={applyFilter} className='bg-rabbit-red text-white py-1 px-2  mb-2 w-full text-xs rounded-lg'>Apply Filters</button>

            {/* CATEGORY FILTER */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2 '>Category</label>
                {categories.map((category, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input onChange={handleFilterChange} checked={filters.category === category}
                            value={category} type="radio" name="category" id="" className='mr-2 w-4 h-4' />
                        <span className='text-gray-700'>{category}</span>
                    </div>
                ))}
            </div>
            {/* GENDER FILTER */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2 '>Gender</label>
                {genders.map((gender, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input onChange={handleFilterChange} checked={filters.gender === gender}
                            value={gender} type="radio" name="gender" id="" className='mr-2 w-4 h-4' />
                        <span className='text-gray-700'>{gender}</span>
                    </div>
                ))}
            </div>
            {/* COLOR FILTER */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2 '>Color</label>
                <div className='flex flex-wrap gap-2'>
                    {colors.map((color, index) => (
                        <button value={color} onClick={handleFilterChange} key={index} name='color' className={`h-6 w-6 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`} style={{ backgroundColor: color.toLowerCase() }}></button>
                    ))}
                </div>
            </div>
            {/* SIZE FILTER */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2 '>Size</label>
                {sizes.map((size, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input onChange={handleFilterChange} checked={filters.size.includes(size)}
                            value={size} type="checkbox" name="size" id="" className='mr-2 w-4 h-4' />
                        <span className='text-gray-700'>{size}</span>
                    </div>
                ))}
            </div>
            {/* BRAND FILTER */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2 '>Brand</label>
                {brands.map((brand, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input onChange={handleFilterChange} checked={filters.brand.includes(brand)}
                            value={brand} type="checkbox" name="brand" id="" className='mr-2 w-4 h-4' />
                        <span className='text-gray-700'>{brand}</span>
                    </div>
                ))}
            </div>
            {/* MATERIAL FILTER */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2 '>Material</label>
                {materials.map((material, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input onChange={handleFilterChange} checked={filters.material.includes(material)}
                            value={material} type="checkbox" name="material" id="" className='mr-2 w-4 h-4 border-gray-300' />
                        <span className='text-gray-700'>{material}</span>
                    </div>
                ))}
            </div>

            {/* PRICE RANGE */}
            <div className="mb-8">
                <label className='block text-gray-600 font-medium mb-2 '>Price Range</label>
                <input type="range" name="priceRange" onChange={handlePriceChange} value={priceRange[1]} max={10000} min={0} id="" className='h-2 rounded-lg bg-gray-300 w-full appearance-none cursor-pointer' />
                <div className='flex justify-between text-gray-600 mt-2 '>
                    <span>&#8377;0</span>
                    <span>&#8377;{priceRange[1]}</span>
                </div>
            </div>




        </div>
    )
}

export default FilterSidebar