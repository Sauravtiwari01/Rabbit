import React, { useEffect, useRef, useState } from 'react'
import { FaFilter, FaLess } from "react-icons/fa"
import FilterSidebar from '../components/products/FilterSidebar';
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
const CollectionPage = () => {
    const { collection } = useParams()
    const [searchPaarams] = useSearchParams()
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.products)
    const sidebarRef = useRef(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const queryParams = Object.fromEntries([...searchPaarams])

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }))
    }, [dispatch, searchPaarams])
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false)
        }

    }
    useEffect(() => {
        // Add mouse event
        document.addEventListener("mousedown", handleClickOutside)

        // Clean mouse event
        return () => document.removeEventListener("mousedown", handleClickOutside)
    })


    return (
        <div className='flex flex-col lg:flex-row '>
            {/* MOBILE FILTER BUTTON */}
            <button onClick={toggleSidebar} className='lg:hidden border p-2 flex items-center justify-center'>
                <FaFilter className='mr-2' />Filters
            </button>
            {/* FILTER SIDEBAR */}
            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 w-64 bg-white transition-transform duration-300 z-50 overflow-y-auto lg:static lg:translate-x-0`}>
                <FilterSidebar />
            </div>

            <div className='flex-grow p-4'>
                <h2 className='text-2xl mb-4 uppercase'>ALL COLLECTION</h2>
                {/* SORT OPTIONS */}
                <SortOptions />
                {/* PRODUCT GRID */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage