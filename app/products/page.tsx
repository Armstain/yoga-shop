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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <Link href={`/products/${product._id}`} key={product._id.toString()}>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="relative h-48">
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
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
