import ProductCard from './ProductCard';
import { PackageSearch } from 'lucide-react';

export default function ProductList({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto my-8">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Aucun article ne correspond à vos critères de recherche ou de filtre. Essayez d'ajuster votre recherche ou de sélectionner une autre catégorie.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Liste des produits">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
