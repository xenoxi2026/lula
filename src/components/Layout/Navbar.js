import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const { cartItemsCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-lula-black border-b border-lula-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/lula-logo.png" alt="Lula" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <span className="text-xs text-lula-gold/60 tracking-wider">by</span>
              <img src="/melome-logo.png" alt="Melome" className="h-5 w-auto mt-0.5" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-lula-gold font-medium transition-colors text-sm uppercase tracking-wider">
              Home
            </Link>
            <Link to="/shop" className="text-gray-300 hover:text-lula-gold font-medium transition-colors text-sm uppercase tracking-wider">
              Shop
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-lula-gold font-medium transition-colors text-sm uppercase tracking-wider">
              About
            </Link>
            <Link to="/checkout" className="relative text-gray-300 hover:text-lula-gold transition-colors">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-lula-gold text-lula-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/checkout" className="relative text-gray-300">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-lula-gold text-lula-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300">
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-lula-gold/20">
            <Link to="/" className="block text-gray-300 hover:text-lula-gold py-2 text-sm uppercase tracking-wider" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block text-gray-300 hover:text-lula-gold py-2 text-sm uppercase tracking-wider" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/about" className="block text-gray-300 hover:text-lula-gold py-2 text-sm uppercase tracking-wider" onClick={() => setIsMenuOpen(false)}>About</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar