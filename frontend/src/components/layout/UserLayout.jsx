import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
    {/* HEADER */}
    <Header/>
    {/* MAIN CONTENT */}
    <main>
      <Outlet/>
    </main>
    {/* FOOTER */}
    <Footer />
    </>
  )
}

export default UserLayout