import React from 'react'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const ContactPage = () => {
  const whatsappNumber = '27789467636'

  return (
    <div className="min-h-screen bg-lula-dark py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-lula-gold mb-4 font-display text-center">Contact Us</h1>
        <p className="text-gray-400 text-center mb-12">We're here to help. Reach out anytime.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lula-black border border-lula-gold/20 rounded-xl p-6 text-center hover:border-lula-gold transition-all"
          >
            <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-green-400">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
            <p className="text-gray-400 text-sm">Chat with us instantly</p>
          </a>

          {/* Email */}
          <a
            href="mailto:melomegroup@gmail.com"
            className="bg-lula-black border border-lula-gold/20 rounded-xl p-6 text-center hover:border-lula-gold transition-all"
          >
            <div className="w-14 h-14 bg-lula-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon className="w-7 h-7 text-lula-gold" />
            </div>
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-gray-400 text-sm">melomegroup@gmail.com</p>
          </a>

          {/* Melome */}
          <a
            href="https://melome-app-live.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lula-black border border-lula-gold/20 rounded-xl p-6 text-center hover:border-lula-gold transition-all"
          >
            <div className="w-14 h-14 bg-lula-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="w-7 h-7 text-lula-gold" />
            </div>
            <h3 className="text-white font-semibold mb-2">About Melome</h3>
            <p className="text-gray-400 text-sm">Our fulfillment partner</p>
          </a>
        </div>

        {/* Payment Info */}
        <div className="bg-lula-black border border-lula-gold/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-lula-gold mb-4 font-display text-center">Payment Options</h2>
          <p className="text-gray-400 text-center mb-6 text-sm">We'll send payment details via WhatsApp after you place your order.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-lula-dark rounded-lg p-4">
              <span className="text-lula-gold font-bold block mb-1">E-Wallet</span>
              <span className="text-gray-400 text-xs">FNB, Standard Bank, Capitec</span>
            </div>
            <div className="bg-lula-dark rounded-lg p-4">
              <span className="text-lula-gold font-bold block mb-1">Bank Transfer</span>
              <span className="text-gray-400 text-xs">EFT / Instant EFT</span>
            </div>
            <div className="bg-lula-dark rounded-lg p-4">
              <span className="text-lula-gold font-bold block mb-1">Cash Send</span>
              <span className="text-gray-400 text-xs">Pick up & pay at PEP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage