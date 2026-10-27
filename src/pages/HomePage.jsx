import { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories } from '../services/api';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { AlertCircle, RefreshCw, ShoppingBag, ShieldCheck, Truck, Headphones } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtres (F2)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Chargement des produits & catégories au montage (F1)
  const fetchCatalogue = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories().catch(() => []),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(
        err.message || 'Une erreur est survenue lors du chargement des produits. Veuillez vérifier votre connexion.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogue();
  }, []);

  // Filtrage combiné réactif calculé dynamiquement (F2)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtrage textuel (recherche insensible à la casse sur titre et description)
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Tri dynamique
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white p-6 sm:p-10 shadow-lg shadow-indigo-500/20">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-sm border border-white/20">
            <ShoppingBag className="w-3.5 h-3.5" />
            Boutique Démo React SPA
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Explorez notre collection tendance & tech.
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Profitez des meilleurs produits sélectionnés avec soin via FakeStore API. Filtrez, découvrez les fiches détaillées et gérez votre panier en temps réel !
          </p>
        </div>

        {/* Feature badges */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-indigo-100">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-indigo-300" />
            <span>Livraison gratuite dès 50 €</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-300" />
            <span>Paiement sécurisé garanti</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-indigo-300" />
            <span>Service client disponible 24/7</span>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* Barre de Recherche et Filtres (F2) */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={filteredProducts.length}
      />

      {/* État de chargement (F1) */}
      {isLoading && <Loader type="skeleton" count={8} />}

      {/* Gestion des erreurs (F1) */}
      {!isLoading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-red-900 mb-1">Erreur de chargement</h2>
          <p className="text-xs sm:text-sm text-red-700 mb-4">{error}</p>
          <button
            type="button"
            onClick={fetchCatalogue}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
        </div>
      )}

      {/* Grille des produits (F1) */}
      {!isLoading && !error && <ProductList products={filteredProducts} />}
    </div>
  );
}
