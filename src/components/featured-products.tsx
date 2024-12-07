"use client"

import { motion } from 'framer-motion'
import { ProductCard } from "@/components/ProductCard"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CustomButton } from './CustomButton'
import { useRouter } from 'next/navigation'

export function FeaturedProducts() {
  const router = useRouter();

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <h1 className="text-4xl font-bold text-center mb-10">Why Choose us</h1>
      <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 gap-10 md:gap-5 lg:gap-10 md:grid-cols-3 ">
        
        <div
          className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow"
        >
          
          <div className="h-[50vh] w-[70vw] md:w-[30vw]">
            <img
              className="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-1000"
              src="/VR-headset.jpg"
              alt=""
            />
          </div>

          
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 transition duration-1000"
          ></div>

          
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 translate-all duration-1000"
          >
            <h1 className="text-3xl font-bold text-white">Tech-Savvy</h1>
            <p
              className="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            >
              Offering the latest devices with cutting-edge features to keep you ahead of the curve.
            </p>
            <button
              className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60 transition-shadow duration-300"
              onClick={() => {
                router.push("/products")
              }}
              
            >
              See More
            </button>
          </div>
        </div>

        <div
          className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow"
        >
          <div className="h-[50vh] w-[70vw] md:w-[30vw]">
            <img
              className="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-1000"
              src="/laptop-cover.jpg"
              alt=""
            />
          </div>
          
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"
          ></div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 translate-all duration-500"
          >
            <h1 className="text-3xl font-bold text-white">Trusted</h1>
            <p
              className="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Delivering high-quality products and reliable service you can count on every time.
            </p>
            <button
              className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60 transition-shadow duration-300"
              onClick={() => {
                router.push("/products")
              }}         
            >
              See More
            </button>
          </div>
        </div>

        <div
          className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow"
        >
          <div className="h-[50vh] w-[70vw] md:w-[30vw]">
            <img
              className="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
              src="/smartwatch-cover.jpg"
              alt=""
            />
          </div>
          
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"
          ></div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 translate-all duration-500"
          >
            <h1 className="text-3xl font-bold text-white">Value-Driven</h1>
            <p
              className="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Providing the best deals and competitive prices without compromising on quality.
            </p>
            <button
              className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60 transition-shadow duration-300"
              onClick={() => {
                router.push("/products")
              }}                  
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className='w-full flex justify-center items-center mt-10' >
      <CustomButton url="/products" >All Products</CustomButton>
    </div>
    </section>
  )
}

