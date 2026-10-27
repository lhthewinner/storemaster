import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  X,
  CreditCard,
} from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  // Livraison gratuite si panier > 50 €
  const shippingThreshold = 50;
  const shippingCost = totalPrice >= shippingThreshold || totalPrice === 0 ? 0 : 4.99;
  const grandTotal = totalPrice + shippingCost;
  const freeShippingRemaining = Math.max(0, shippingThreshold - totalPrice);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  // État panier vide
  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-16 border border-gray-100 shadow-sm text-center max-w-xl mx-auto my-12">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
          Vous n'avez pas encore ajouté de produit à votre panier. Parcourez notre catalogue et découvrez nos meilleures offres !
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/25 active:scale-98"
        >
          Découvrir les produits
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Simulation commande réussie
  if (isOrdered) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-16 border border-emerald-100 shadow-sm text-center max-w-xl mx-auto my-12 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Merci pour votre commande !</h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
          Votre commande factice a été enregistrée avec succès dans le cadre de la démonstration StoreMaster. Le panier a été réinitialisé.
        </p>
        <Link
          to="/"
          onClick={() => setIsOrdered(false)}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/25"
        >
          Retourner à l'accueil
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Mon Panier
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalItems} article{totalItems > 1 ? 's' : ''} sélectionné{totalItems > 1 ? 's' : ''}
          </p>
        </div>

        {/* Bouton vider le panier (F4) */}
        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          Vider le panier
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-2">
          <Truck className="w-5 h-5 text-indigo-600" />
          <p className="text-xs sm:text-sm font-semibold text-gray-800">
            {freeShippingRemaining > 0 ? (
              <>
                Ajoutez encore <span className="text-indigo-600 font-bold">{freeShippingRemaining.toFixed(2)} €</span> d'achats pour profiter de la <span className="font-bold">livraison gratuite</span> !
              </>
            ) : (
              <span className="text-emerald-700 font-bold">
                🎉 Félicitations ! Vous bénéficiez de la livraison offerte sur cette commande !
              </span>
            )}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (totalPrice / shippingThreshold) * 100)}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Item List & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Item List (F4) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              ← Poursuivre mes achats
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6 sticky top-24">
          <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">
            Récapitulatif de la commande
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Articles ({totalItems})</span>
              <span className="font-semibold text-gray-900">{totalPrice.toFixed(2)} €</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Frais de livraison</span>
              {shippingCost === 0 ? (
                <span className="font-semibold text-emerald-600">Gratuit</span>
              ) : (
                <span className="font-semibold text-gray-900">{shippingCost.toFixed(2)} €</span>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
              <span className="text-base font-bold text-gray-900">Total TTC</span>
              <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">
                {grandTotal.toFixed(2)} €
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 active:scale-98 transition-all"
          >
            <CreditCard className="w-5 h-5" />
            Passer la commande
          </button>

          {/* Reassurance */}
          <div className="space-y-2 pt-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garantie satisfait ou remboursé sous 30 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Expédition sous 24 à 48 heures ouvrées</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Simulation */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-scale-in">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">Valider la commande</h3>
            <p className="text-xs text-gray-500 mb-6">
              Simulation d'achat pour tester le flux complet de la SPA StoreMaster.
            </p>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Marie Curie"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  required
                  defaultValue="client@storemaster.dev"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Adresse de livraison
                </label>
                <input
                  type="text"
                  required
                  defaultValue="12 rue de la Paix, 75001 Paris"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-gray-900">
                <span>Total à régler :</span>
                <span className="text-indigo-600 text-lg">{grandTotal.toFixed(2)} €</span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-colors"
                >
                  Confirmer et payer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
