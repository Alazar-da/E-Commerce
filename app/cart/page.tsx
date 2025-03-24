import React from 'react'
import Navbar from '../components/Navbar'
import { CartProvider } from '../context/cartContext';
import Carts from '../components/Cart';
function Cart() {
  return (
    <CartProvider>
        <Navbar />
        <Carts />
    </CartProvider>
  )
}

export default Cart