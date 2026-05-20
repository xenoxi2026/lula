import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/supabaseClient'
import { useCart } from '../context/CartContext'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const ShopPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDiscount, setShowDiscount] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('price', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All', icon: '✨' },
    { id: 'wigs', name: 'Wigs', icon: '👑' },
    { id: 'bundles', name: 'Bundles', icon: '💎' },
    { id: 'braiding', name: 'Braiding', icon: '🪮' },
    { id: 'beauty', name: 'Beauty', icon: '💄' },
    { id: 'accessories', name: 'Accessories', icon: '🛍️' },
    { id: 'hair_care', name: 'Hair Care', icon: '💧' },
  ]

  const textures = ['Straight', 'Body Wave', 'Curly', 'Deep Wave']

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory
    const matchSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  const orderOnWhatsApp = (product) => {
    const msg = `Hi Lula! I'm interested in:%0A%0A✨ ${product.name}%0A💰 R ${product.price}%0A%0ACan you help me place an order?`
    window.open(`https://wa.me/27789467636?text=${msg}`, '_blank')
  }

  return (
    <div className="bg-lula-dark min-h-screen">
      {/* Discount Banner */}
      {showDiscount && (
        <div className="bg-gradient-to-r from-lula-gold to-yellow-600 text-lula-black text-center py-3 px-4 relative">
          <p className="text-sm font-bold tracking-wide">
            🎉 FREE SHIPPING on orders over R1,000 — PAXI & Takealot Pickup
          </p>
          <button
            onClick={() => setShowDiscount(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lula-black/60 hover:text-lula-black font-bold text-lg"
          >
            ×
          </button>
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="relative bg-lula-black border-b border-lula-gold/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lula-gold/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center relative z-10">
          <p className="text-lula-gold/60 text-xs sm:text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Premium Hair Collection
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display text-white mb-4 leading-tight">
            Your Crown,<br />
            <span className="text-gradient">Your Power.</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            Luxury beauty essentials designed for confident women across South Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#shop"
              className="bg-lula-gold text-lula-black px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-yellow-500 transition-all active:scale-95"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="border border-lula-gold/40 text-lula-gold px-8 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-lula-gold/10 transition-all active:scale-95"
            >
              Browse Collection
            </a>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2 font-display">
          Shop by Category
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8">Find exactly what you need</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setSearchTerm('')
                document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-lula-gold border-lula-gold text-lula-black shadow-lg shadow-lula-gold/20'
                  : 'bg-lula-black border-lula-gold/20 text-gray-300 hover:border-lula-gold/50 hover:text-lula-gold'
              }`}
            >
              <span className="text-xl sm:text-2xl mb-1">{cat.icon}</span>
              <span className="text-[10px] sm:text-xs font-medium leading-tight text-center">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Texture Quick Filter */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider">Shop by Texture</p>
          <div className="flex flex-wrap justify-center gap-2">
            {textures.map((texture) => (
              <button
                key={texture}
                onClick={() => setSearchTerm(texture)}
                className="px-4 py-1.5 rounded-full text-xs border border-lula-gold/20 text-gray-400 hover:text-lula-gold hover:border-lula-gold/50 transition-all"
              >
                {texture}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SEARCH BAR ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="relative max-w-md mx-auto">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-lula-black border border-lula-gold/20 text-white rounded-xl focus:border-lula-gold focus:ring-1 focus:ring-lula-gold outline-none placeholder-gray-500 text-sm"
          />
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {activeCategory === 'all' ? 'Featured Collection' : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Premium quality, curated for you</p>
          </div>
          <p className="text-gray-500 text-sm">{filteredProducts.length} products</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lula-gold"></div>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-lula-black rounded-2xl border border-lula-gold/10">
            <span className="text-5xl mb-4 block">✨</span>
            <p className="text-gray-400 text-lg">No products found</p>
            <p className="text-gray-500 text-sm mt-2">Try a different search or browse via WhatsApp</p>
            <a
              href="https://wa.me/27789467636?text=Hi%20Lula!%20I'd%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-green-700 transition-all"
            >
              💬 Order on WhatsApp
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-lula-black border border-lula-gold/10 rounded-2xl overflow-hidden group hover:border-lula-gold/40 transition-all duration-300 hover:shadow-xl hover:shadow-lula-gold/5"
            >
              <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-lula-dark">
                <img
                  src={product.image_url || 'https://via.placeholder.com/400x400/1A1A1A/D4AF37?text=Lula'}
                  alt={product.name}
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/1A1A1A/D4AF37?text=Lula'
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold text-lula-black bg-lula-gold px-2 py-1 rounded-full uppercase tracking-wider">
                    {product.category?.replace('_', ' ')}
                  </span>
                </div>
                {product.price >= 1000 && (
                  <div className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    FREE SHIPPING
                  </div>
                )}
              </Link>

              <div className="p-4 sm:p-5">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-1 hover:text-lula-gold transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
                  {product.description || 'Premium quality hair.'}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg sm:text-xl font-bold text-lula-gold">
                    R {product.price?.toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-lula-gold text-lula-black py-2.5 rounded-lg text-xs sm:text-sm font-bold hover:bg-yellow-500 transition-all active:scale-95 uppercase tracking-wider"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => orderOnWhatsApp(product)}
                    className="flex items-center justify-center gap-1 bg-green-600 text-white py-2.5 px-3 rounded-lg text-xs font-semibold hover:bg-green-700 transition-all active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-lula-black border-y border-lula-gold/10 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2">What Our Queens Say</h2>
          <p className="text-gray-400 text-sm mb-10">Trusted by women across South Africa</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Thandi M.', role: 'Johannesburg', quote: 'The HD lace wig changed my life. Nobody can tell it\'s not my hair. Lula is the real deal!', rating: 5 },
              { name: 'Zinhle K.', role: 'Cape Town', quote: 'Best bundles I\'ve ever bought. Silky, soft, and they last forever. Ordering again!', rating: 5 },
              { name: 'Lerato S.', role: 'Durban', quote: 'The satin bonnet is a game changer. My hair stays perfect overnight. Luxury quality.', rating: 5 },
            ].map((testimonial, i) => (
              <div key={i} className="bg-lula-dark border border-lula-gold/10 rounded-xl p-6 text-left">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                <p className="text-gray-500 text-xs">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INSTAGRAM GALLERY ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center font-display mb-2">Follow the Glow</h2>
        <p className="text-gray-400 text-center text-sm mb-8">@LulaByMelome on Instagram</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {[
            'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cf6?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b1?w=300&h=300&fit=crop',
          ].map((img, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-lula-dark hover:opacity-80 transition-opacity cursor-pointer">
              <img src={img} alt={`Lula style ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ============ TRUST SECTION ============ */}
      <section className="bg-lula-black border-t border-lula-gold/10 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2">Why Shop Lula?</h2>
          <p className="text-gray-400 text-sm mb-10">The trusted beauty destination</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: '✨', title: 'Premium Quality', desc: 'Curated products' },
              { icon: '🤝', title: 'Trusted Network', desc: 'Verified partners' },
              { icon: '🚚', title: 'Nationwide Delivery', desc: 'PAXI & Takealot' },
              { icon: '💎', title: 'Beauty Pros', desc: 'Verified stylists' },
              { icon: '💬', title: 'Customer Support', desc: 'WhatsApp help' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <span className="text-3xl block mb-2">{item.icon}</span>
                <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INSTALLER TEASER ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-lula-gold/10 to-lula-gold/5 border border-lula-gold/20 rounded-2xl p-8 sm:p-12 text-center">
          <span className="text-4xl mb-4 block">💇🏾‍♀️</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">Find an Installer Near You</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
            Coming soon! Book verified braiders, stylists, and makeup artists after purchasing your hair.
          </p>
          <span className="inline-block bg-lula-gold/20 text-lula-gold px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider">
            Launching Soon
          </span>
        </div>
      </section>
    </div>
  )
}

export default ShopPage