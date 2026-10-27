import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import { ShoppingBag, Heart } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Barre de navigation globale avec badge panier réactif (F4) */}
      <Navbar />

      {/* Contenu principal avec conteneur responsive */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-gray-800">StoreMaster</span>
            <span>— Projet pédagogique React & Vite</span>
          </div>
          <p className="flex items-center justify-center gap-1">
            Conçu avec React 18, React Router & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
