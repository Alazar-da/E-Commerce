"use client";
import React, { useState, useEffect } from 'react';
import products from '../../data/products.json';
import { Product } from '@/utils/ProductType';
import { useParams } from 'next/navigation';
import { useCart } from '../../context/cartContext';
import { ToastContainer, toast } from 'react-toastify';
import { CartItem } from '@/utils/CartType';
import Navbar from '@/app/components/Navbar';
function ProductDetail() {
    const { id } = useParams(); // Get the id from the URL
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | undefined>(undefined); // State for the specific product

    useEffect(() => {
        setAllProducts(products);
    }, []);

    useEffect(() => {
        if (id && typeof id === 'string') { // Ensure id is a string
            const productId = parseInt(id, 10); // Convert id from string to number
            const foundProduct = allProducts.find((product) => product.id === productId);
            setProduct(foundProduct);
        }
    }, [id, allProducts]);

    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            quantity: 1, // Default quantity to 1, you can adjust this as needed
            price: product.price,
        };
        addToCart(cartItem);
        toast.success(`${product.name} added to cart`);
    };

    if (!product) {
        return <div>Product not found</div>; // Handle case where product is not found
    }

    return (
        <>
        <Navbar/>
        
        <section className='py-5 flex flex-col gap-5 justify-center items-center w-full min-h-screen'>  
            <ToastContainer />
            <div className="bg-slate-100 flex md:flex-row flex-col rounded-md shadow-md w-5/6">
                <img src={product.image} alt={product.name} className="md:w-1/3 w-full object-cover md:rounded-l-md rounded-t-md md:rounded-tr-none" />
                <div className='flex flex-col gap-2 p-4 '>
                    <h2 className="text-xl font-semibold text-amber-600">{product.name}</h2>
                    <p className="text-sm">{product.description}</p>
                    <p className="text-sm">Price: <span className='font-semibold'>${product.price}</span></p>
                    <p className="text-sm">Quantity: <span className='font-semibold'>{product.quantity} Pieces</span></p>
                    <p className="text-sm ">Brand: <span className='font-semibold'>{product.brand}</span></p>
                    <p className="text-xs bg-green-300 rounded-full px-3 py-0.5 w-fit text-slate-100 flex items-center"> {product.condition}</p>
                    <p className="text-sm">Category: <span className='font-semibold'>{product.category}</span></p>
                    <button className='bg-cyan-400 rounded-md px-3 py-1 w-fit text-white hover:bg-cyan-600' onClick={() => handleAddToCart(product)}>Add to Cart </button>
                </div>
            </div> 
        </section>
        </>
    );
}

export default ProductDetail;