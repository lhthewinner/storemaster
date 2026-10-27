import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import {
  Star,
  ShoppingCart,
  Check,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  AlertCircle,
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams(); // Extraction du paramètre d'URL (F3)
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Récupération des données du produit (F3)
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        if (!isMounted) return;
        if (!data || !data.id) {
          throw new Error('Produit introuvable.');
        }
        setProduct(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Impossible de charger la fiche de ce produit.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <Loader text="Chargement des détails du produit..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto my-12">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Produit non trouvé</h2>
        <p className="text-sm text-gray-500 mb-6">{error || "Cet article n'existe pas ou a été retiré."}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const rate = product?.rating?.rate ?? 0;
  const count = product?.rating?.count ?? 0;

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Back navigation */}
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        <span>/</span>
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          Catalogue
        </Link>
        <span>/</span>
        <span className="capitalize text-gray-400 truncate max-w-[150px] sm:max-w-xs">
          {product.category}
        </span>
      </nav>

      {/* Main Product Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Agrandie (F3) */}
          <div className="bg-gray-50/70 rounded-2xl p-8 flex items-center justify-center border border-gray-100 min-h-[350px] sm:min-h-[420px]">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 sm:max-h-96 w-auto object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Informations produit (F3) */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 capitalize">
                {product.category}
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                {product.title}
              </h1>

              {/* Note et avis (F3) */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400 mr-1.5" />
                  <span className="font-bold text-sm text-gray-900">{rate}</span>
                  <span className="text-xs text-gray-400 ml-1">/ 5</span>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  Basé sur {count} avis clients vérifiés
                </span>
              </div>
            </div>

            {/* Prix */}
            <div className="pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400 block font-medium">Prix unitaire TTC</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {Number(product.price).toFixed(2)} €
                </span>
              </div>
            </div>

            {/* Description complète (F3) */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Description du produit
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Sélecteur de quantité & Bouton d'ajout au panier (F3 / F4) */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Sélecteur de quantité */}
              <div className="flex items-center justify-between sm:justify-start bg-gray-50 border border-gray-200 rounded-xl p-1 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 active:scale-95 disabled:opacity-40 disabled:hover:bg-white text-gray-700 flex items-center justify-center shadow-xs transition-colors"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-base text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 active:scale-95 text-gray-700 flex items-center justify-center shadow-xs transition-colors"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Bouton d'ajout au panier (F3 / F4) */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold transition-all duration-200 shadow-md active:scale-98 ${
                  isAdded
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/25 hover:shadow-indigo-600/40'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 animate-scale-in" />
                    <span>Ajouté au panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Ajouter au panier ({(product.price * quantity).toFixed(2)} €)</span>
                  </>
                )}
              </button>
            </div>

            {/* Garanties e-commerce */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-[11px] sm:text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Livraison standard 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Paiement sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>Retours sous 30 jours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
