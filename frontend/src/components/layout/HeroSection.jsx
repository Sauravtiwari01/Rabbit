import React from 'react'
import heroImg from "../../assets/rabbit-hero.webp"
import { Link } from 'react-router-dom'
const HeroSection = () => {
    return (
        <section className='relative'>
            <img src={heroImg} alt="Rabbit" className='w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover' />
            <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center'>
                <div className=' text-center p-6  text-white'>
                    <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>vacation
                        <br />ready</h1>
                    <p className='text-sm tracking-tighter md:text-lg mb-6'>Explore our vacation-ready outfits with fast world-wide shipping.</p>
                    <Link className='bg-white text-gray-950 text-lg rounded-sm px-6 py-2'>Shop Now</Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection