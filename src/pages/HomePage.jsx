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

  const scrollToCatalogue = () => {
    const el = document.getElementById('catalogue-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowPromos = () => {
    // Sélectionne une catégorie populaire ou trie par note
    setSortBy('rating-desc');
    scrollToCatalogue();
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner conforme au design demandé */}
      <section
        className="relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl shadow-indigo-500/15"
        style={{
          background: 'linear-gradient(135deg, #2446df 0%, #4764f6 38%, #7e8cf7 70%, #d8c7fe 100%)',
        }}
      >
        {/* Main 2-columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10">
          {/* Colonne de gauche : Titre, description et boutons CTA */}
          <div className="lg:col-span-7 space-y-5">
            {/* Badge pilule */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/25 text-white shadow-xs">
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
              <span>Boutique Démo React SPA</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-white">
              Explorez notre collection <br />
              tendance & tech.
            </h1>

            {/* Sous-titre */}
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Découvrez les meilleurs produits sélectionnés pour vous. Filtrez, explorez et gérez votre panier en temps réel !
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToCatalogue}
                className="px-6 py-3.5 rounded-full bg-white text-indigo-700 hover:bg-indigo-50 text-sm sm:text-base font-bold shadow-lg shadow-black/10 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Découvrir le Catalogue
              </button>

              <button
                type="button"
                onClick={handleShowPromos}
                className="px-4 py-3 text-sm sm:text-base font-bold text-white hover:text-white/85 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Voir les Promos
              </button>
            </div>
          </div>

          {/* Colonne de droite : Composition visuelle des produits */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] sm:max-w-[440px] flex items-center justify-center">
              {/* Image détourée fidèle à la maquette */}
              <img
                src="/hero-products.png"
                alt="Produits phares StoreMaster : Casque audio, Smartwatch et Sac à dos Fjallraven"
                className="relative z-10 w-full h-auto object-contain select-none drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Bandeau d'engagements en bas */}
        <div className="mt-10 pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-medium text-white/90 relative z-10">
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-white flex-shrink-0" />
            <span>Livraison gratuite dès 50 €</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-white flex-shrink-0" />
            <span>Paiement sécurisé garanti</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Headphones className="w-4 h-4 text-white flex-shrink-0" />
            <span>Service client disponible 24/7</span>
          </div>
        </div>
      </section>

      {/* Barre de Recherche et Filtres (F2) avec ancre pour le scroll */}
      <div id="catalogue-section">
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
      </div>

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
