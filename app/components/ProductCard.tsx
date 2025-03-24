"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/utils/ProductType'
function ProductCard({product}: {product: Product}) {
    const router = useRouter()
  return (
    <main key={product.id} className="bg-slate-100 rounded-md shadow-md w-80 hover:shadow-lg hover:-translate-y-1.5 transform transition duration-500 ease-in-out">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-md" />
                        <div className='flex flex-col gap-2 p-4'>
                            <h2 className="text-xl font-semibold text-amber-600">{product.name}</h2>
                           {/*  <p className="text-sm">{product.description}</p> */}
                            <p className="text-sm">Price: <span className='font-semibold'>${product.price}</span></p>
                        {/*     <p className="text-sm">Quantity: {product.quantity}</p> */}
                            <p className="text-sm ">Brand: <span className='font-semibold'>{product.brand}</span></p>
                            <p className="text-xs bg-green-300 rounded-full px-3 py-0.5 w-fit text-slate-100 flex items-center"> {product.condition}</p>
                       {/*      <p className="text-sm">Category: {product.category}</p> */}
                       <button className="bg-amber-600 text-slate-100 px-2 py-1 rounded-md mt-2 hover:cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}>View More</button>
                        
                    </div>
                        
    </main>
  )
}

export default ProductCard