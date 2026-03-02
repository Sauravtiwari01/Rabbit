import React from 'react'
import {HiOutlineCreditCard, HiShoppingBag} from 'react-icons/hi'
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
const FeaturesSection = () => {
    return (
        <section className='py-16 px-4 bg-white'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* FEATURE 1 */}
                <div className='flex flex-col items-center'>
                    <div className='p-4 rounded-full mb-4'>
                        <HiShoppingBag className='text-xl'/>
                    </div>
                    <h4 className='tracking-tighter mb-2'>FREE INTERNATIONAL SHIPPING</h4>
                    <p className='tracking-tighter text-gray-600 text-sm'>On all orders above 999</p>
                </div>

                {/* FEATURE 1 */}
                <div className='flex flex-col items-center'>
                    <div className='p-4 rounded-full mb-4'>
                        <HiArrowPathRoundedSquare className='text-xl'/>
                    </div>
                    <h4 className='tracking-tighter mb-2'>45 DAYS RETURN</h4>
                    <p className='tracking-tighter text-gray-600 text-sm'>Money back guarantee</p>
                </div>

                {/* FEATURE 1 */}
                <div className='flex flex-col items-center'>
                    <div className='p-4 rounded-full mb-4'>
                        <HiOutlineCreditCard className='text-xl'/>
                    </div>
                    <h4 className='tracking-tighter mb-2'>SECURED CHECKOUT</h4>
                    <p className='tracking-tighter text-gray-600 text-sm'>100% secured checkout process</p>
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection