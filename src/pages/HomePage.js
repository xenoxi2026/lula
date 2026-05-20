import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-luxury py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <img src="/lula-logo.png" alt="Lula" className="h-20 mx-auto mb-8" />
          <p className="text-lula-gold text-lg mb-2 font-display italic">by Melome</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
            Premium <span className="text-gradient">Straight Hair</span>
          </h1>
          <p className="text-gray-300 text-lg mb-4 max-w-xl mx-auto">
            PAXI & Takealot delivery. No store needed.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/shop" className="bg-lula-gold text-lula-black px-10 py-4 rounded font-bold text-lg hover:bg-yellow-500 transition-all uppercase tracking-wider">
              Shop Now
            </Link>
            <a href="https://melome-app-live.onrender.com" target="_blank" rel="noopener noreferrer" className="border border-lula-gold text-lula-gold px-10 py-4 rounded font-semibold hover:bg-lula-gold hover:text-lula-black transition-all uppercase tracking-wider text-sm">
              About Melome
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-lula-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-lula-gold font-display">How Lula Works</h2>
          <p className="text-gray-400 text-center mb-12">Fulfilled by Melome</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Browse & Choose', desc: 'Straight bundles, lace fronts, closures.' },
              { step: '2', title: 'Select Pickup', desc: 'PAXI (PEP Store) or Takealot Point.' },
              { step: '3', title: 'Collect & Slay', desc: 'Melome processes. You collect.' },
            ].map((item) => (
              <div key={item.step} className="text-center p-8 bg-lula-black border border-lula-gold/20 rounded-xl">
                <div className="w-14 h-14 bg-lula-gold text-lula-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Melome Mission */}
      <section className="py-20 px-4 bg-luxury border-t border-lula-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <img src="/melome-logo.png" alt="Melome" className="h-8 mx-auto mb-6" />
          <p className="text-gray-300 text-lg italic leading-relaxed">
            "To engineer a future-proof supply chain ecosystem that moves both physical goods and high-impact stories across the SADC region."
          </p>
          <a 
            href="https://melome-app-live.onrender.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-6 text-lula-gold hover:underline text-sm uppercase tracking-wider"
          >
            Learn more about Melome →
          </a>
        </div>
      </section>
    </div>
  )
}

export default HomePage