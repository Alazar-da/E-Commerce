// context/CartContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '@/utils/CartType';

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Key for localStorage
const CART_STORAGE_KEY = 'cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Load cart from localStorage on initial render
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                // If the item already exists, update its quantity
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            }
            // If the item doesn't exist, add it to the cart
            return [...prevCart, { ...item, quantity: item.quantity }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
    };

    const clearCart = () => {
        setCart([]); // Reset the cart to an empty array
        if (typeof window !== 'undefined') {
            localStorage.removeItem(CART_STORAGE_KEY); // Clear localStorage
        }
    };

    const increaseQuantity = (id: number) => {
        setCart((prevCart) =>
            prevCart.map((cartItem) =>
                cartItem.id === id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((cartItem) =>
                cartItem.id === id
                    ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) }
                    : cartItem
            );
            // Remove the item if its quantity is 0
            return updatedCart.filter((cartItem) => cartItem.quantity > 0);
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};