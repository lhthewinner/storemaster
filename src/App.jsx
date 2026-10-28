import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import { ShoppingBag } from 'lucide-react';

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

      {/* Footer soigné et personnalisé pour Lucien HAIKOU */}
      <footer className="bg-white border-t border-gray-200/80 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-100">
            {/* Colonne Marque */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-gray-900">
                  Store<span className="text-indigo-600">Master</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                Votre destination e-commerce pour une expérience d'achat fluide, intuitive et sécurisée.
              </p>
            </div>

            {/* Navigation rapide */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/" className="hover:text-indigo-600 transition-colors">
                    Catalogue produits
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-indigo-600 transition-colors">
                    Mon Panier
                  </Link>
                </li>
              </ul>
            </div>

            {/* Engagements client */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                Engagements
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Livraison rapide 48h</li>
                <li>Paiement 100% sécurisé</li>
                <li>Support client 24/7</li>
              </ul>
            </div>
          </div>

          {/* Barre inférieure avec signature */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-gray-800">StoreMaster</span>. Tous droits réservés.
            </p>
            <div className="flex items-center gap-1.5 font-medium">
              <span>Créé et développé par</span>
              <span className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors text-sm">
                Lucien HAIKOU
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
