import React from 'react'
import { Link } from 'react-router-dom'
import featured from "../../assets/featured.webp"
const FeaturedCollection = () => {
    return (
        <section className='py-16 px-14 '>
            <div className='container mx-auto flex flex-col-reverse items-center bg-green-50 rounded-3xl lg:flex-row'>
                {/* RIGHT - TEXT */}
                <div className='lg:w-1/2 text-center p-8 lg:text-left'>
                    <h2 className='font-semibold text-lg mb-2 text-gray-700'>Comfort and Style</h2>
                    <h2 className='text-4xl font-bold lg:text-5xl mb-6'>Apparel made for your everyday life</h2>
                    <p className='text-lg text-gray-600 mb-6'>Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Desgined to make you look and feel great everyday.</p>
                    <Link to="/collections/all" className='bg-black px-6 py-3 text-lg text-white rounded-lg hover:bg-gray-800'>Shop now</Link>
                </div>
                {/* LEFT - IMAGE */}
                <div className='lg:w-1/2'>
                    <img src={featured} alt="" className='w-full h-full object-cover lg:rounded-r-3xl' />
                </div>
            </div>
        </section>
    )
}

export default FeaturedCollection