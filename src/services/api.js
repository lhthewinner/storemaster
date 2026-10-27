const API_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com';

/**
 * Service API centralisé pour StoreMaster
 */

// Récupère la liste complète des produits
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error(`Erreur HTTP lors de la récupération des produits: ${response.status}`);
  }
  return response.json();
}

// Récupère un produit unique par son identifiant
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Impossible de trouver le produit avec l'id: ${id} (Status: ${response.status})`);
  }
  return response.json();
}

// Récupère toutes les catégories disponibles
export async function getCategories() {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des catégories: ${response.status}`);
  }
  return response.json();
}

// Récupère les produits d'une catégorie spécifique
export async function getProductsByCategory(category) {
  const response = await fetch(`${API_URL}/products/category/${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des produits de la catégorie: ${category}`);
  }
  return response.json();
}
