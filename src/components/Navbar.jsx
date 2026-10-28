import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-800 bg-clip-text text-transparent">
                  Store<span className="text-indigo-600">Master</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block -mt-0.5">
                Catalogue E-Commerce
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                }`
              }
            >
              Catalogue
            </NavLink>

            {/* Cart Link with Animated Badge */}
            <Link
              to="/cart"
              aria-label={`Panier avec ${totalItems} article${totalItems > 1 ? 's' : ''}`}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-indigo-600 active:scale-95 transition-all duration-200 shadow-sm shadow-gray-900/10 hover:shadow-indigo-500/25"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Panier</span>

              {/* Dynamic Badge (F4) */}
              {totalItems > 0 ? (
                <span
                  key={totalItems}
                  className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-indigo-500 rounded-full animate-bounce sm:animate-none"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              ) : (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold text-gray-400 bg-gray-800 rounded-full">
                  0
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
