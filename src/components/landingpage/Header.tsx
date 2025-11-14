import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface HeaderData {
  appName: string
  logoHeader: string
  favicon: string
}

const Header: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    fetch('/assets/data.json')
      .then((response) => response.json())
      .then((data) => {
        setHeaderData(data)
        // Update favicon dynamically
        const faviconLink = document.getElementById(
          'favicon'
        ) as HTMLLinkElement
        if (faviconLink && data.favicon) {
          faviconLink.href = data.favicon
        }
      })
      .catch((error) => console.error('Error loading header data:', error))
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  if (!headerData) {
    return null // Or a loading spinner
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              id="header-logo"
              src={headerData.logoHeader}
              alt={`${headerData.appName} Logo`}
              className="h-10"
            />
            <span id="app-name" className="text-2xl font-bold text-green-700">
              {headerData.appName}
            </span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-green-700">
            Home
          </Link>
          <a href="#about" className="text-gray-600 hover:text-green-700">
            Tentang
          </a>
          <a href="#features" className="text-gray-600 hover:text-green-700">
            Fitur
          </a>
          <a href="#technology" className="text-gray-600 hover:text-green-700">
            Teknologi
          </a>
          <a href="#products" className="text-gray-600 hover:text-green-700">
            Produk
          </a>
          <a
            href="#testimonials"
            className="text-gray-600 hover:text-green-700"
          >
            Testimoni
          </a>
          <a href="#contact" className="text-gray-600 hover:text-green-700">
            Kontak
          </a>
        </div>
        <div className="hidden md:block">
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300"
          >
            Daftar / Coba Gratis
          </Link>
        </div>
        <div className="md:hidden">
          <button
            id="mobile-menu-button"
            className="text-gray-600 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8 text-xl ${
          isMobileMenuOpen ? '' : 'hidden'
        }`}
      >
        <button
          id="close-mobile-menu-button"
          className="absolute top-6 right-6 text-gray-600 focus:outline-none"
          onClick={closeMobileMenu}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Link
          to="/"
          className="text-gray-600 hover:text-green-700"
          onClick={closeMobileMenu}
        >
          Home
        </Link>
        <a
          href="#about"
          className="text-gray-600 hover:text-green-700"
          onClick={closeMobileMenu}
        >
          Tentang
        </a>
        <a
          href="#features"
          className="text-gray-600 hover:text-green-700"
          onClick={closeMobileMenu}
        >
          Fitur
        </a>
        <a
          href="#technology"
          className="text-gray-600 hover:text-green-700"
          onClick={closeMobileMenu}
        >
          Teknologi
        </a>
        <a
          href="#products"
          className="text-gray-600 hover:text-green-700"
          onClick={closeMobileMenu}
        >
          Produk
        </a>
        <a
          href="#testimonials"
          className="text-gray-600 hover:text-green-700"
          onClick={closeMobileMenu}
        >
          Testimoni
        </a>
        <a
          href="#contact"
          className="text-gray-600 hover:text-green-700"
          onClick={closeMobileMenu}
        >
          Kontak
        </a>
        <Link
          to="/register"
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300"
          onClick={closeMobileMenu}
        >
          Daftar / Coba Gratis
        </Link>
      </div>
    </header>
  )
}

export default Header
