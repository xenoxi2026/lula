import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { supabase } from '../supabase/supabaseClient'
import toast from 'react-hot-toast'

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    deliveryMethod: 'paxi',
    paxiStoreCode: '',
    takealotPickupPoint: '',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    if (formData.deliveryMethod === 'paxi' && !formData.paxiStoreCode.trim()) {
      toast.error('Please enter your PEP Store Code for PAXI delivery.')
      return
    }

    if (formData.deliveryMethod === 'takealot' && !formData.takealotPickupPoint.trim()) {
      toast.error('Please enter your Takealot Pickup Point.')
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        customer_name: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        delivery_method: formData.deliveryMethod,
        delivery_detail:
          formData.deliveryMethod === 'paxi'
            ? `PEP Store Code: ${formData.paxiStoreCode}`
            : `Takealot Pickup: ${formData.takealotPickupPoint}`,
        items: cartItems,
        total_amount: cartTotal,
        notes: formData.notes,
        status: 'pending',
        fulfilled_by: 'Melome',
        seller_name: 'Melome',
      }

      const { error } = await supabase.from('orders').insert([orderData])

      if (error) throw error

      toast.success('Order placed! Check WhatsApp for payment details.')
      clearCart()

      // Notify seller via WhatsApp
      const sellerMsg = `🛍️ NEW LULA ORDER!%0A%0A👤 ${formData.customerName}%0A📧 ${formData.email}%0A📱 ${formData.phone}%0A🚚 ${formData.deliveryMethod}: ${formData.deliveryMethod === 'paxi' ? formData.paxiStoreCode : formData.takealotPickupPoint}%0A💰 R ${cartTotal.toFixed(2)}%0A%0A📦 Items:%0A${cartItems.map(i => `- ${i.name} x${i.quantity}`).join('%0A')}`
      window.open(`https://wa.me/27789467636?text=${sellerMsg}`, '_blank')

      navigate('/contact')
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
      console.error('Order submission error:', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="bg-lula-gold text-lula-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all inline-block uppercase tracking-wider text-sm">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-lula-gold mb-8 font-display">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-lula-black border border-lula-gold/20 p-6 rounded-xl sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Your Order</h3>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start border-b border-lula-gold/10 pb-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-white">{item.name}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-lula-gold font-bold px-1"
                      >
                        -
                      </button>
                      <span className="text-sm text-gray-300">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-lula-gold font-bold px-1"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-400 hover:text-red-300 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="font-semibold text-sm text-lula-gold">
                    R {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-lula-gold/20 pt-4">
              <div className="flex justify-between text-lg font-extrabold mb-6">
                <span className="text-white">Total</span>
                <span className="text-lula-gold">R {cartTotal.toFixed(2)}</span>
              </div>
              {/* Melome Badge */}
              <div className="bg-lula-gold/10 p-4 rounded-lg border border-lula-gold/30">
                <p className="text-xs text-gray-300 flex items-center">
                  <span className="font-bold text-lula-gold mr-1">Melome</span>
                  will fulfill this order
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-lula-black border border-lula-gold/20 p-8 rounded-xl space-y-8">
            {/* Personal Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-lula-dark border border-lula-gold/20 text-white rounded-lg focus:ring-2 focus:ring-lula-gold focus:border-transparent outline-none placeholder-gray-500"
                    placeholder="Thandi Nkosi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-lula-dark border border-lula-gold/20 text-white rounded-lg focus:ring-2 focus:ring-lula-gold focus:border-transparent outline-none placeholder-gray-500"
                    placeholder="thandi@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-lula-dark border border-lula-gold/20 text-white rounded-lg focus:ring-2 focus:ring-lula-gold focus:border-transparent outline-none placeholder-gray-500"
                    placeholder="082 123 4567"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="border-t border-lula-gold/20 pt-6">
              <h3 className="text-xl font-bold text-white mb-2">Delivery Method</h3>
              <p className="text-sm text-gray-400 mb-6">
                We deliver to pickup points only. Choose your preferred collection method.
              </p>

              {/* PAXI Option */}
              <div className="mb-4">
                <label className="flex items-start p-4 bg-lula-dark border border-lula-gold/20 rounded-lg cursor-pointer hover:border-lula-gold transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="paxi"
                    checked={formData.deliveryMethod === 'paxi'}
                    onChange={handleChange}
                    className="mt-1 mr-3 accent-lula-gold"
                  />
                  <div>
                    <span className="font-bold text-lg text-white">PAXI (PEP Store)</span>
                    <p className="text-xs text-gray-400">
                      Collect from your nearest PEP store locker
                    </p>
                  </div>
                </label>
                {formData.deliveryMethod === 'paxi' && (
                  <div className="ml-8 mt-3">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      PEP Store Code or Name *
                    </label>
                    <input
                      type="text"
                      name="paxiStoreCode"
                      required
                      value={formData.paxiStoreCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-lula-dark border border-lula-gold/20 text-white rounded-lg focus:ring-2 focus:ring-lula-gold focus:border-transparent outline-none placeholder-gray-500"
                      placeholder="e.g., PEP1234 or Sandton City PEP"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Find your nearest PEP store code at pep.co.za
                    </p>
                  </div>
                )}
              </div>

              {/* Takealot Option */}
              <div>
                <label className="flex items-start p-4 bg-lula-dark border border-lula-gold/20 rounded-lg cursor-pointer hover:border-lula-gold transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="takealot"
                    checked={formData.deliveryMethod === 'takealot'}
                    onChange={handleChange}
                    className="mt-1 mr-3 accent-lula-gold"
                  />
                  <div>
                    <span className="font-bold text-lg text-white">Takealot Pickup Point</span>
                    <p className="text-xs text-gray-400">
                      Collect from a Takealot collection point near you
                    </p>
                  </div>
                </label>
                {formData.deliveryMethod === 'takealot' && (
                  <div className="ml-8 mt-3">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Takealot Pickup Point Name *
                    </label>
                    <input
                      type="text"
                      name="takealotPickupPoint"
                      required
                      value={formData.takealotPickupPoint}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-lula-dark border border-lula-gold/20 text-white rounded-lg focus:ring-2 focus:ring-lula-gold focus:border-transparent outline-none placeholder-gray-500"
                      placeholder="e.g., Takealot Cape Town CBD"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the full name of your preferred pickup point
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="border-t border-lula-gold/20 pt-6">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-lula-dark border border-lula-gold/20 text-white rounded-lg focus:ring-2 focus:ring-lula-gold focus:border-transparent outline-none placeholder-gray-500"
                placeholder="Any special instructions..."
              />
            </div>

            {/* Payment Notice */}
            <div className="bg-lula-gold/10 border border-lula-gold/30 rounded-lg p-4 text-center">
              <p className="text-lula-gold text-sm font-medium">
                💡 After placing your order, we'll send payment details via WhatsApp.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                E-Wallet • Bank Transfer • Cash Send
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-lula-gold text-lula-black py-4 px-6 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {isSubmitting ? 'Placing Order...' : `Place Order — R ${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage