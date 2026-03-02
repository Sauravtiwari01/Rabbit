import React, { useEffect, useState } from 'react'
import HeroSection from '../components/layout/HeroSection'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeaturesSection from '../components/products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters, setFilters } from '../redux/slices/productsSlice'
import axios from 'axios'


const Home = () => {

  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const [bestSellerProduct, setBestSellerProduct] = useState(null)


  useEffect(() => {
    // fetch product for a specific collection
    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Top Wear",
      limit: 8
    }))

    // Fetch bestseller
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchBestSeller()
  }, [dispatch])

  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />

      {/* BEST SELLERS */}
      <h2 className='text-3xl font-bold text-center mb-4'>Best Seller</h2>
      {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (
        <p className='text-center'>Loading Best Selling product...</p>
      )}



      {/* TOP WEAR FOR WOMEN */}
      <section className='p-12'>
        <div className="container mx-auto">
          <h2 className='text-3xl font-bold text-center mb-4'>Top Wears For Women</h2>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <FeaturedCollection />

      {/* BRAND FEATURES SECTION */}
      <FeaturesSection />

    </div>
  )
}

export default Home