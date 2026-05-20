import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="w-full overflow-hidden bg-gray-100">
          <img
            src={product.image_url || 'https://via.placeholder.com/400x400?text=Lula+Hair'}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Lula+Hair'
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-semibold text-lula-burgundy bg-red-50 px-2 py-1 rounded-full uppercase">
            {product.category}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-lula-burgundy transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-lula-burgundy">
            R {product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-lula-burgundy text-white px-4 py-2 rounded-lg text-sm font-semibold
                       hover:bg-red-900 transition-all active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard