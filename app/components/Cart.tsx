"use client";
import React from 'react';
import { useCart } from './../context/cartContext';

function Cart() {
    const { cart, removeFromCart, clearCart, addToCart } = useCart();

    console.log("Cart state:", cart); // Debugging

    // Function to increase the quantity of an item
    const increaseQuantity = (item: any) => {
        addToCart({ ...item, quantity: 1 }); // Add 1 to the current quantity
    };

    // Function to decrease the quantity of an item
    const decreaseQuantity = (item: any) => {
        if (item.quantity > 1) {
            addToCart({ ...item, quantity: -1 }); // Subtract 1 from the current quantity
        } else {
            removeFromCart(item.id); // Remove the item if quantity is 1
        }
    };

    if (!cart || cart.length === 0) {
        return <div className="text-center text-gray-600">Your cart is empty.</div>; // Handle empty cart
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <button
                className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors"
                onClick={clearCart}
            >
                Clear Cart
            </button>
            <ul className="mt-4">
                {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between my-2 p-2 border-b border-gray-200">
                        <span className="text-gray-700">
                            {item.name} - Quantity: {item.quantity}
                        </span>
                        <div>
                            <button
                                className="bg-cyan-500 text-white px-2 py-1 rounded mx-1 hover:bg-cyan-600 transition-colors"
                                onClick={() => increaseQuantity(item)}
                            >
                                +
                            </button>
                            <button
                                className="bg-amber-500 text-white px-2 py-1 rounded mx-1 hover:bg-amber-600 transition-colors"
                                onClick={() => decreaseQuantity(item)}
                            >
                                -
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded mx-1 hover:bg-red-600 transition-colors"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;