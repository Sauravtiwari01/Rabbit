import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { Link } from 'react-router-dom'
const NewArrivals = () => {
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [newArrivals, setNewArrivals] = useState([])

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
                setNewArrivals(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchNewArrivals()
    }, [])
    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300

        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
    }
    const handleMouseMove = (e) => {
        if (!isDragging) return
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x - startX
        scrollRef.current.scrollLeft = scrollLeft - walk
    }
    const handleMouseUpOrLeave = (e) => {
        setIsDragging(false)
    }

    // Update scroll Buttons
    function updateScrollButton() {
        const container = scrollRef.current
        if (container) {
            const leftScroll = container.scrollLeft
            setCanScrollLeft(leftScroll > 0)
            const scrollRight = container.scrollWidth > leftScroll + container.clientWidth
            setCanScrollRight(scrollRight)
        }
    }

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener("scroll", updateScrollButton)
            updateScrollButton()

            return () => container.removeEventListener("scroll", updateScrollButton)
        }
    }, [newArrivals])
    return (
        <section className='p-16'>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='font-bold text-3xl mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-800 mb-8 '>Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.</p>

                {/* SCROLL BUTTONS */}
                <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
                    <button onClick={() => { scroll("left") }} className={`rounded border p-2 ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400"}`} disabled={!canScrollLeft}><FiChevronLeft className='text-2xl' /> </button>
                    <button onClick={() => { scroll("right") }} className={`rounded border p-2 ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400"}`} disabled={!canScrollRight}><FiChevronRight className='text-2xl' /> </button>

                </div>
            </div>
            {/* SCROLLABLE CONTENT */}
            <div ref={scrollRef} className={`container mx-auto no-scrollbar overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}>
                {newArrivals.map((product, index) => {
                    return <div key={index} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img src={product.images[0]?.url} alt={product.images[0]?.alttext || product.name} className='w-full h-[500px] object-cover rounded-lg' draggable={false} />
                        <div className='absolute right-0 left-0 bottom-0 p-4 text-white rounded-b-lg bg-opacity-50 backdrop-blur-md'>
                            <Link className='block' to={`/product/${product._id}`}>
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>{product.price}</p></Link>
                        </div>
                    </div>
                })}

            </div>
        </section>
    )
}

export default NewArrivals