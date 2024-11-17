'use client';
import { Product } from '@/types/products';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Our Products</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product: Product) => (
          <Link href={`/products/${product._id}`} key={product._id.toString()}>
            <div className="card bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <figure className="relative h-56">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 w-full">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </figure>
              <div className="card-body p-6">
                <h2 className="card-title text-lg text-black">{product.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold text-primary mt-2">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
