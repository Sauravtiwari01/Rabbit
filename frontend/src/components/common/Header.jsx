import React from 'react'
import TopBar from '../layout/TopBar'
import NavBar from './NavBar'

const Header = () => {
  return (
    <header className='border-b border-gray-200'>
      {/* TOPBAR */}
      <TopBar />
      {/* NAVBAR */}
      <NavBar />
    </header>
  )
}

export default Header