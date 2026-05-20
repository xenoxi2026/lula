import React, { createContext, useContext, useReducer } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('lula_cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const cartReducer = (state, action) => {
  let newState

  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        }
      }
      toast.success(`${action.payload.name} added to cart!`)
      break
    }

    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
      toast.error('Item removed from cart')
      break

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1) return state
      newState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
      break

    case 'CLEAR_CART':
      newState = { ...state, items: [] }
      break

    default:
      return state
  }

  localStorage.setItem('lula_cart', JSON.stringify(newState.items))
  return newState
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadCartFromStorage(),
  })

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity },
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const cartTotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const cartItemsCount = state.items.reduce(
    (count, item) => count + item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}