"use client"
import React,{useState,useEffect} from 'react'
import products from '../data/products.json'
import { Product } from '@/utils/ProductType'
import ProductCard from './ProductCard'

function Products() {
    const [allProducts,setAllProducts] = useState<Product[]>([])
    useEffect(()=>{
        setAllProducts(products)
    },[])
  return (
    <section className='py-5 flex flex-col gap-5 justify-center items-center'>
        <div>
            <h2 className='w-full text-center text-cyan-700 font-semibold md:text-3xl'>Product List</h2>
        </div>
        <div className="container flex mx-auto flex-wrap gap-5 w-5/6">
            {allProducts.map((product)=>{
                return(
                    <ProductCard product={product} key={product.id} />
                    
                )
            })}
        </div>

    </section>
  )
}

export default Products