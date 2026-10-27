import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-gray-100 shadow-sm text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">Erreur 404</span>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Page non trouvée</h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/25 active:scale-98"
        >
          <Home className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
