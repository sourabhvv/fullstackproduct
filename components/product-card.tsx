'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  benefits?: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image || '/placeholder.svg?key=3bbgl'}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded whitespace-nowrap">
            {product.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        {product.benefits && product.benefits.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">Key Benefits:</p>
            <div className="flex flex-wrap gap-1">
              {product.benefits.slice(0, 2).map((benefit, i) => (
                <span key={i} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-purple-600">₹{product.price}</p>
          </div>
          <Link href={`/product/${product._id}`}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Inquire
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
