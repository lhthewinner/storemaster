import { Loader2 } from 'lucide-react';

export default function Loader({ type = 'spinner', count = 8, text = 'Chargement des données...' }) {
  if (type === 'skeleton') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col space-y-4">
            <div className="w-full h-48 bg-gray-200 rounded-xl" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-5 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-9 bg-gray-200 rounded-lg w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
        <Loader2 className="w-7 h-7 text-indigo-600 absolute animate-pulse" />
      </div>
      <p className="text-gray-600 font-medium text-base tracking-wide">{text}</p>
      <span className="text-xs text-gray-400 mt-1">Connexion à FakeStore API...</span>
    </div>
  );
}
