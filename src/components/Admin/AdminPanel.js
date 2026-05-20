import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabase/supabaseClient'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', category: 'bundles', image_url: '', stock: 0
  })

  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const ADMIN_PASSWORD = 'melome2024'

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts()
      fetchOrders()
    }
  }, [isLoggedIn])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
  }

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('products').insert([{
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    }])
    if (!error) {
      setNewProduct({ name: '', description: '', price: '', category: 'bundles', image_url: '', stock: 0 })
      fetchProducts()
    }
  }

  const handleDeleteProduct = async (id) => {
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-lula-dark flex items-center justify-center">
        <div className="bg-lula-black p-10 rounded-xl border border-lula-gold/30 max-w-md w-full">
          <img src="/melome-logo.png" alt="Melome" className="h-8 mx-auto mb-6" />
          <h2 className="text-lula-gold text-2xl font-bold text-center mb-6 font-display">Melome Seller Portal</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-lula-dark border border-lula-gold/30 text-white rounded-lg mb-4 focus:border-lula-gold outline-none"
          />
          <button
            onClick={() => password === ADMIN_PASSWORD && setIsLoggedIn(true)}
            className="w-full bg-lula-gold text-lula-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-all uppercase tracking-wider"
          >
            Access Portal
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lula-dark">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-lula-gold font-display">Melome Seller Portal</h1>
            <p className="text-gray-400 text-sm">Managing Lula — your straight hair brand</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-gray-400 hover:text-lula-gold text-sm">Logout</button>
        </div>

        <div className="flex space-x-6 mb-8 border-b border-lula-gold/20">
          {['products', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm uppercase tracking-wider font-medium ${
                activeTab === tab ? 'text-lula-gold border-b-2 border-lula-gold' : 'text-gray-400'
              }`}
            >
              {tab === 'products' ? 'Lula Products' : 'Melome Orders'}
            </button>
          ))}
        </div>

        {activeTab === 'products' && (
          <div>
            <form onSubmit={handleAddProduct} className="bg-lula-black p-6 rounded-xl border border-lula-gold/20 mb-8 grid grid-cols-2 gap-4">
              <input placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required className="bg-lula-dark border border-lula-gold/20 text-white px-4 py-2 rounded" />
              <input placeholder="Price (R)" type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required className="bg-lula-dark border border-lula-gold/20 text-white px-4 py-2 rounded" />
              <input placeholder="Image URL" value={newProduct.image_url} onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})} className="bg-lula-dark border border-lula-gold/20 text-white px-4 py-2 rounded col-span-2" />
              <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="bg-lula-dark border border-lula-gold/20 text-white px-4 py-2 rounded col-span-2" rows="2" />
              <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="bg-lula-dark border border-lula-gold/20 text-white px-4 py-2 rounded">
                <option value="bundles">Bundles</option>
                <option value="lace_front">Lace Front</option>
                <option value="closure">Closure</option>
              </select>
              <button type="submit" className="bg-lula-gold text-lula-black font-bold py-2 rounded hover:bg-yellow-500 uppercase tracking-wider">Add Product</button>
            </form>

            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="bg-lula-black border border-lula-gold/20 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium">{product.name}</span>
                    <span className="text-lula-gold ml-3">R {product.price}</span>
                    <span className="text-gray-500 text-xs ml-3 uppercase">{product.category}</span>
                  </div>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-lula-black border border-lula-gold/20 p-6 rounded-xl">
                <div className="flex justify-between mb-3">
                  <span className="text-lula-gold font-bold">Order #{order.id}</span>
                  <span className={`text-xs px-2 py-1 rounded ${order.status === 'pending' ? 'bg-yellow-900 text-yellow-400' : 'bg-green-900 text-green-400'}`}>{order.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <p><strong className="text-white">{order.customer_name}</strong></p>
                  <p>{order.phone}</p>
                  <p className="uppercase">{order.delivery_method}: {order.delivery_detail}</p>
                  <p className="text-lula-gold font-bold">R {order.total_amount}</p>
                  <p className="col-span-2 text-xs">Fulfilled by: <span className="text-lula-gold">Melome</span></p>
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-gray-500 text-center py-10">No orders yet.</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel