import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {
    const [searchParams, setSearchParms] = useSearchParams()

    const handleSortChange = (e) => {
        const sortBy = e.target.value
        searchParams.set("sortBy", sortBy)
        setSearchParms(searchParams)
    }
    return (
        <div className='flex justify-end items-center mb-4'>
            <select name="sort" id="sort" value={searchParams.get("sortBy") || ""} onChange={handleSortChange} className='border p-2 rounded-md focus:outline-none'>
                <option value="">Default</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDes">Price: High to Low</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    )
}

export default SortOptions