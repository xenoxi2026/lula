import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-lula-black border-t border-lula-gold/20 mt-auto">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img src="/lula-logo.png" alt="Lula" className="h-12 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium straight hair. Easy ordering. PAXI & Takealot delivery.
            </p>
            <div className="mt-4">
              <img src="/melome-logo.png" alt="Melome" className="h-5 w-auto" />
            </div>
          </div>

          <div>
            <h4 className="text-lula-gold font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-lula-gold text-sm transition-colors">All Products</Link></li>
              <li><Link to="/checkout" className="text-gray-400 hover:text-lula-gold text-sm transition-colors">Cart</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-lula-gold text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lula-gold font-semibold mb-4 text-sm uppercase tracking-wider">Melome</h4>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              Engineering a future-proof supply chain ecosystem that moves both physical goods and high-impact stories across the SADC region.
            </p>
            <a 
              href="https://melome-app-live.onrender.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lula-gold text-xs hover:underline"
            >
              Visit Melome →
            </a>
          </div>

          <div>
            <h4 className="text-lula-gold font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://wa.me/27789467636" target="_blank" rel="noopener noreferrer" className="hover:text-lula-gold transition-colors">
                  WhatsApp: 078 946 7636
                </a>
              </li>
              <li>
                <a href="mailto:melomegroup@gmail.com" className="hover:text-lula-gold transition-colors">
                  melomegroup@gmail.com
                </a>
              </li>
              <li>South Africa</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              &copy; {currentYear} Melome. Lula is a Melome brand.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer