import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    // Évite de déclencher la navigation du Link englobant
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const rate = product?.rating?.rate ?? 0;
  const count = product?.rating?.count ?? 0;

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Product Image and badges */}
      <Link
        to={`/product/${product.id}`}
        className="block relative bg-white p-6 aspect-square overflow-hidden border-b border-gray-50 flex items-center justify-center cursor-pointer"
        aria-label={`Voir les détails de ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-48 w-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold text-gray-600 bg-gray-100/90 backdrop-blur-sm rounded-full capitalize">
          {product.category}
        </span>

        {/* Quick view hint */}
        <div className="absolute inset-0 bg-gray-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-gray-800 text-xs font-semibold rounded-full shadow-md">
            <Eye className="w-3.5 h-3.5" />
            Voir détails
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold ml-1 text-gray-800">{rate}</span>
            </div>
            <span className="text-gray-400">({count} avis)</span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm sm:text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2"
            title={product.title}
          >
            {product.title}
          </Link>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Prix</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              {Number(product.price).toFixed(2)} €
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Ajouter ${product.title} au panier`}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 hover:shadow-indigo-600/30'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 animate-scale-in" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
