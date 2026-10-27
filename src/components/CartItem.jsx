import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:border-gray-200 transition-colors">
      {/* Product Image */}
      <Link
        to={`/product/${item.id}`}
        className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden group"
      >
        <img
          src={item.image}
          alt={item.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
        {item.category && (
          <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
            {item.category}
          </span>
        )}
        <Link
          to={`/product/${item.id}`}
          className="block text-sm sm:text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2"
        >
          {item.title}
        </Link>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Prix unitaire : <span className="text-gray-900 font-semibold">{Number(item.price).toFixed(2)} €</span>
        </p>
      </div>

      {/* Quantity Controls & Line Total */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        {/* Quantity Controls (F4) */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, -1)}
            aria-label="Diminuer la quantité"
            title="Diminuer la quantité (supprime si 0)"
            className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 active:scale-95 text-gray-700 flex items-center justify-center shadow-xs transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-10 text-center font-bold text-sm text-gray-900">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, +1)}
            aria-label="Augmenter la quantité"
            className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 active:scale-95 text-gray-700 flex items-center justify-center shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Subtotal */}
        <div className="text-right min-w-[90px]">
          <span className="text-xs text-gray-400 block font-medium">Sous-total</span>
          <span className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            {lineTotal} €
          </span>
        </div>

        {/* Remove Button (F4) */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Supprimer ${item.title} du panier`}
          title="Supprimer l'article"
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
