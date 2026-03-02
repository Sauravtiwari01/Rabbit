import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProductsByFilters, setFilters } from '../../redux/slices/productsSlice'
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleSearchToggle() {
        setIsOpen(!isOpen)
    }

    function handleSearch(e) {
        e.preventDefault()
        dispatch(setFilters({search:searchTerm}))
        dispatch(fetchProductsByFilters({search:searchTerm}))
        navigate(`/collections/all?search=${searchTerm}`)
        setIsOpen(false)
    }
    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`} >
            {isOpen ?
                < form onSubmit={handleSearch} className='relative flex items-center justify-center w-full' > <div className='relative w-1/2'>

                    <input type="text" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} placeholder='Search' className=' bg-gray-100 rounded-lg placeholder:text-black focus:outline-none px-4 py-2 pl-2 pr-12 w-full' />
                    {/* SEARCH BUTTON */}
                    <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                        <HiMagnifyingGlass className='w-5 h-5 ' />
                    </button>
                    <button onClick={handleSearchToggle} className='absolute -right-5 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'><HiMiniXMark className='h-5 w-5 text-gray-700' />
                    </button>
                </div >
                    {/* CLOSE BUTTON */}


                </form > : <button onClick={handleSearchToggle} className='hover:text-black '>
                    <HiMagnifyingGlass className='w-5 h-5 text-gray-700' />
                </button>}
        </div >
    )
}

export default SearchBar