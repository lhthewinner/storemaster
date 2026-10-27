import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const CATEGORY_LABELS = {
  all: 'Tous les articles',
  "men's clothing": 'Vêtements Homme',
  "women's clothing": 'Vêtements Femme',
  "jewelery": 'Bijoux & Accessoires',
  "electronics": 'High-Tech & Électronique',
};

export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories = [],
  sortBy,
  onSortChange,
  totalResults = 0,
}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm space-y-4 mb-8">
      {/* Top Bar: Search Input & Sort Selector */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input (F2) */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher par titre, mot-clé ou description..."
            className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-gray-50 hover:bg-gray-100/80 focus:bg-white text-gray-800 text-sm sm:text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all duration-200 placeholder:text-gray-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              title="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto">
          <label htmlFor="sort-select" className="sr-only">Trier par</label>
          <div className="relative w-full md:w-56">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer transition-all"
            >
              <option value="featured">Pertinence (Défaut)</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
              <option value="rating-desc">Meilleures notes</option>
              <option value="name-asc">Nom : A à Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills (F2) */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            Tous les articles
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const label = CATEGORY_LABELS[cat] || cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 capitalize ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active filters status */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
        <span>
          {totalResults} produit{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
        </span>
        {(searchTerm || selectedCategory !== 'all') && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
            }}
            className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>
    </div>
  );
}
