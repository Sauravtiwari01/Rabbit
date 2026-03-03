import React from 'react'
import maleCollection from "../../assets/mens-collection.webp"
import femaleCollection from "../../assets/womens-collection.webp"
import { Link } from 'react-router-dom'
const GenderCollectionSection = () => {
    return (
        <section className='py-16 px-5 '>
            <div className='container mx-auto  flex flex-col md:flex-row  gap-8 '>
                {/* WOMEN COLLECTION */}
                <div className="relative flex-1">

                    <img src={maleCollection} alt="Mens Collection" className='w-full h-[600px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 '>
                        <h2 className='font-bold text-2xl text-gray-900 mb-3'>Men's Collection</h2>
                        <Link to="/collections/all?gender=men" className='text-gray-900 underline'>Shop Now</Link>
                    </div>
                </div>
                {/* MEN COLLECTION */}
                <div className="relative flex-1">

                    <img src={femaleCollection} alt="Womens Collection" className='w-full h-[600px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 '>
                        <h2 className='font-bold text-2xl text-gray-900 mb-3'>Women's Collection</h2>
                        <Link to="/collections/all?gender=women" className='text-gray-900 underline'>Shop Now</Link>
                    </div>
                </div>





            </div>
        </section>
    )
}

export default GenderCollectionSection