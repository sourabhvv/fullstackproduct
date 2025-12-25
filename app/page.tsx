'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Immunity', 'Digestion', 'Detox', 'Balance'];
  const filteredProducts =
    filter === 'All' ? products : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-900">
            Shuddhi
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/#products" className="text-gray-700 hover:text-purple-600">
              Products
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600">
              Contact
            </Link>
            <Link href="/admin/login" className="text-gray-700 hover:text-purple-600">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
              Natural Wellness with Shuddhi Ayurveda
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover our range of authentic Ayurvedic products crafted with pure herbs and
              natural ingredients to enhance your health and wellness journey.
            </p>
            <div className="flex gap-4">
              <Link href="/#products">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="text-purple-600 border-purple-600">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="uppercase tracking-wider text-purple-600 font-semibold">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">A Simple Path to Inner Healing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Healing should feel natural, supportive, and deeply personal. Here’s how we gently guide you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Healing Path</h3>
              <p className="text-gray-600 mb-4">
                Explore Reiki, Sound Healing, Meditation and more. Select what resonates with your heart.
              </p>
              <Link href="/contact"><Button variant="outline" className="text-purple-600 border-purple-600">Talk to a Healer</Button></Link>
            </div>
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book a Session</h3>
              <p className="text-gray-600 mb-4">
                Schedule at a time that suits you. Start with a 30-minute consultation.
              </p>
              <Link href="/contact"><Button className="bg-purple-600 hover:bg-purple-700 text-white">Book Now</Button></Link>
            </div>
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Experience the Shift</h3>
              <p className="text-gray-600 mb-4">
                Arrive in a calm space. Sessions are customized to your energy and needs.
              </p>
              <Link href="/contact"><Button variant="outline" className="text-purple-600 border-purple-600">Start Your Journey</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-wider text-purple-600 font-semibold">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Guiding You Toward True Healing</h2>
            <p className="text-gray-600 mt-4">
              We welcome you into a calm, nurturing space to reconnect with your true self through gentle, proven practices.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              <li>• Energy-Based Healing Therapies</li>
              <li>• Certified & Intuitive Healer</li>
              <li>• Personalized Healing Sessions</li>
              <li>• Ancient Wisdom, Modern Approach</li>
              <li>• Calm & Safe Healing Space</li>
              <li>• Client-Focused, Heart-Centered Care</li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src="/ayurveda-product.jpg" alt="Healing space" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="uppercase tracking-wider text-purple-600 font-semibold">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What Makes Us Unique</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Heart-Centered Healing', desc: 'Feel safe, seen, and supported with genuine care and presence.' },
              { title: 'Holistic Service Range', desc: 'Reiki, Sound Healing, Chakra Balancing, Inner Child Work and more.' },
              { title: 'Personalized Energy Work', desc: 'Every session tailored to your unique energy and needs.' },
              { title: 'Certified & Intuitive', desc: 'Skilled practitioners with deep intuitive sensitivity.' },
              { title: 'Ancient + Modern', desc: 'Traditional wisdom integrated for today’s life.' },
              { title: 'Safe & Peaceful Space', desc: 'A calm sanctuary for deep relaxation and alignment.' },
            ].map((item) => (
              <div key={item.title} className="border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="uppercase tracking-wider text-purple-600 font-semibold">Our Healing Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Transformative Therapies for Mind, Body & Soul</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Sound Healing', bullets: ['Reduces Stress', 'Balances Chakras', 'Improves Sleep'] },
              { title: 'Reiki Healing', bullets: ['Clears Energy Blocks', 'Boosts Emotional Clarity', 'Enhances Inner Peace'] },
              { title: 'Crystal Healing', bullets: ['Amplifies Positive Energy', 'Supports Emotional Release', 'Deep Relaxation'] },
              { title: 'Tarot Card Reading', bullets: ['Clarity in Choices', 'Access Inner Intuition', 'Emotional Insight'] },
            ].map((svc) => (
              <div key={svc.title} className="border rounded-xl p-6 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{svc.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {svc.bullets.map((b) => (<li key={b}>• {b}</li>))}
                </ul>
                <div className="mt-4">
                  <Link href="/contact"><Button variant="outline" className="text-purple-600 border-purple-600">View Details</Button></Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact"><Button className="bg-purple-600 hover:bg-purple-700 text-white">View All Services</Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="uppercase tracking-wider text-purple-600 font-semibold">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Pooja Desai', quote: 'After just one Reiki session, I felt lighter and at peace.' },
              { name: 'Ravi Shah', quote: 'Sound Healing helped me release deep emotions—truly transformative.' },
              { name: 'Neelam Trivedi', quote: 'Chakra Balancing gave me clarity and alignment.' },
            ].map((t) => (
              <div key={t.name} className="border rounded-xl p-6">
                <p className="text-gray-700 mb-4">“{t.quote}”</p>
                <p className="text-sm text-gray-500 font-medium">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Not Sure Where to Begin?</h2>
          <p className="text-gray-600 mt-4">
            Start with a free 15-minute counselling call to discover the right healing modality for you.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/contact"><Button className="bg-purple-600 hover:bg-purple-700 text-white">Book a Session</Button></Link>
            <Link href="/contact"><Button variant="outline" className="text-purple-600 border-purple-600">Talk to a Healer</Button></Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Wellness Range
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collection of Ayurvedic products designed to support
              your health goals
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'default' : 'outline'}
                className={
                  filter === cat
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'text-gray-700 border-gray-300'
                }
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Shuddhi Ayurveda</h3>
              <p className="text-purple-100">Bringing natural wellness to your life</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-purple-100">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#products" className="hover:text-white">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-purple-100">Email: info@shuddhi.com</p>
              <p className="text-purple-100">Phone: +91 1234567890</p>
            </div>
          </div>
          <div className="border-t border-purple-800 pt-8 text-center text-purple-100">
            <p>&copy; 2025 Shuddhi Ayurveda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
