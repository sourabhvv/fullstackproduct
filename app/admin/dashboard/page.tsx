'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from '@/components/admin/product-form';
import ProductList from '@/components/admin/product-list';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, inquiriesRes, contactsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/inquiries'),
        fetch('/api/contact'),
      ]);

      const [productsData, inquiriesData, contactsData] = await Promise.all([
        productsRes.json(),
        inquiriesRes.json(),
        contactsRes.json(),
      ]);

      if (productsData.success) setProducts(productsData.products);
      if (inquiriesData.success) setInquiries(inquiriesData.inquiries);
      if (contactsData.success) setContacts(contactsData.contacts);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-900 text-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Shuddhi Admin</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-purple-900"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">{products.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                Product Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{inquiries.length}</p>
              <Link href="/admin/dashboard/inquiries" className="text-sm text-blue-600 mt-2 inline-block">
                View All →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                Contact Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">{contacts.length}</p>
              <Link href="/admin/dashboard/contacts" className="text-sm text-purple-600 mt-2 inline-block">
                View All →
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Product Management</h2>
            <p className="text-gray-600 mt-1">Create, update, and manage your products</p>
          </div>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(!showForm);
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {showForm ? 'Cancel' : 'Add Product'}
          </Button>
        </div>

        {/* Form Section */}
        {showForm && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <ProductForm
                product={editingProduct}
                onSuccess={handleFormSuccess}
              />
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <ProductList
            products={products}
            onEdit={(product) => {
              setEditingProduct(product);
              setShowForm(true);
            }}
            onDelete={() => fetchData()}
          />
        )}
      </main>
    </div>
  );
}
