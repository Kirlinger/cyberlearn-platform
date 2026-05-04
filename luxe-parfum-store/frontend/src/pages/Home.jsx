import { Link } from 'react-router-dom';
export default function Home() {
  return <section className="text-center py-28 px-6"><h1 className="text-5xl font-bold mb-6">Timeless Luxury in Every Note</h1><p className="max-w-2xl mx-auto mb-8 text-gray-300">Discover artisan-crafted perfumes designed for unforgettable presence.</p><Link to="/products" className="gold-gradient text-black px-8 py-3 rounded-full font-semibold hover:scale-105 inline-block transition">Explore Collection</Link></section>;
}
