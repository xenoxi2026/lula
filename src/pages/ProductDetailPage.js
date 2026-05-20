import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase/supabaseClient'
import { useCart } from '../context/CartContext'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lula-burgundy"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
        <Link to="/shop" className="text-lula-burgundy hover:underline mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/shop"
        className="inline-flex items-center text-gray-500 hover:text-lula-burgundy mb-8 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.image_url || 'https://via.placeholder.com/600x600?text=Lula+Hair'}
            alt={product.name}
            className="w-full h-96 md:h-[500px] object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x600?text=Lula+Hair'
            }}
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold text-lula-burgundy bg-red-50 px-3 py-1 rounded-full uppercase w-fit mb-4">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-8">
            <span className="text-4xl font-extrabold text-lula-burgundy">
              R {product.price}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-lula-burgundy text-white w-full md:w-auto text-center text-lg px-12 py-4 rounded-lg font-semibold hover:bg-red-900 transition-all"
          >
            Add to Cart — R {product.price}
          </button>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Delivery Options</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-lula-gold rounded-full mr-2"></span>
                PAXI — Collect from your nearest PEP Store
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-lula-gold rounded-full mr-2"></span>
                Takealot — Collect from a Pickup Point
              </li>
            </ul>
            <p className="text-xs text-gray-400 mt-3">
              Fulfilled by Melome • Delivery details selected at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage