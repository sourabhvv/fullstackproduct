'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Inquiry {
  _id: string;
  productName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function InquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Shuddhi Admin</h1>
            <p className="text-purple-100 text-sm">Product Inquiries</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/dashboard">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-purple-900"
              >
                Products
              </Button>
            </Link>
            <Button
              onClick={() => {
                localStorage.removeItem('adminToken');
                router.push('/admin/login');
              }}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-purple-900"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Product Inquiries</h2>
          <p className="text-gray-600 mt-1">
            View all customer inquiries about your products
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No inquiries yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(inquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded">
                      {inquiry.productName}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Email</p>
                      <p className="text-sm text-gray-900 break-all">{inquiry.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Phone</p>
                      <p className="text-sm text-gray-900">{inquiry.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Status</p>
                      <p className="text-sm text-gray-900">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                          New
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Message</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {inquiry.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
