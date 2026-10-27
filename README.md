# 🛍️ StoreMaster React

Application Single Page (SPA) e-commerce complète développée avec **React 18**, **Vite**, **Tailwind CSS**, **React Router v6** et l'API publique **FakeStore API**.

Ce projet a été conçu selon le **Cahier des Charges Fonctionnel & Technique** pour maîtriser en profondeur les concepts clés de l'écosystème React moderne.

---

## 🚀 Fonctionnalités implémentées

### 1. 📦 Exploration du Catalogue (F1)
- Récupération asynchrone des données via `fetch` au montage du composant (`useEffect`).
- Indicateur de chargement visuel avec skeleton loading (`Loader.jsx`).
- Gestion robuste des erreurs réseau avec interface de repli et bouton "Réessayer".
- Rendu réactif dans une grille CSS responsive via `ProductList` et `ProductCard` avec des clés uniques (`key={product.id}`).

### 2. 🔍 Recherche et Filtrage Multi-critères (F2)
- Barre de recherche textuelle réactive (`searchTerm`) filtrant sur les titres et descriptions.
- Filtres par catégories dynamiques issues de l'API (Vêtements Homme, Femme, Bijoux, Électronique).
- Tri dynamique des résultats (prix croissant/décroissant, notes, ordre alphabétique).
- Calcul dynamique en mémoire sans requêtes API superflues avec `useMemo`.

### 3. 📄 Fiche Produit Détaillée (F3)
- Routage dynamique `/product/:id` avec `useParams()`.
- Navigation fluide sans rechargement de page via `<Link>`.
- Image haute résolution, note moyenne avec avis clients, description complète et sélecteur de quantité.
- Fil d'Ariane et bouton retour interactif.

### 4. 🛒 Gestion Globale du Panier (F4 - `CartContext`)
- État global partagé via React Context (`CartContext.jsx`) et le hook personnalisé `useCart()`, éliminant le "prop drilling".
- **Ajout au panier** : incrémentation immuable si l'article existe déjà, ou ajout avec quantité initiale.
- **Modification des quantités** : boutons `+` et `-`, avec suppression automatique si la quantité tombe à 0.
- **Suppression unitaire** via `.filter()`.
- **Badge dynamique dans la Navbar** calculant le total d'articles cumulés en temps réel avec `.reduce()`.
- **Calcul du sous-total et du montant total** avec seuil de livraison offerte.
- Modal de validation de commande simulant l'achat et réinitialisant le panier.

### 5. 💾 Persistance des Données (F5 - LocalStorage)
- Synchronisation automatique du panier avec `localStorage` à chaque mise à jour via un `useEffect` dédié.
- Restauration de l'état au démarrage / rafraîchissement (F5) sans perte de données.

---

## 📁 Arborescence du Projet

```
storemaster/
├── public/
│   └── favicon.svg              # Logo et icône de l'application
├── src/
│   ├── components/              # Composants modulaires et réutilisables
│   │   ├── CartItem.jsx         # Ligne de produit du panier (contrôle quantité & suppression)
│   │   ├── Loader.jsx           # Spinner & Skeletons animés
│   │   ├── Navbar.jsx           # En-tête avec navigation et badge réactif
│   │   ├── ProductCard.jsx      # Carte produit individuelle avec note & bouton d'ajout
│   │   ├── ProductList.jsx      # Grille responsive de cartes
│   │   └── SearchBar.jsx        # Recherche texte, tri & filtres par catégories
│   ├── context/
│   │   └── CartContext.jsx      # CartProvider & hook useCart avec synchronisation localStorage
│   ├── pages/                   # Vues associées aux routes
│   │   ├── CartPage.jsx         # Page récapitulative du panier & commande
│   │   ├── HomePage.jsx         # Page d'accueil avec catalogue & hero banner
│   │   ├── NotFound.jsx         # Page d'erreur 404
│   │   └── ProductDetail.jsx    # Page fiche produit détaillée
│   ├── services/
│   │   └── api.js               # Fonctions d'appels HTTP centralisées
│   ├── App.jsx                  # Configuration des routes et mise en page globale
│   ├── index.css                # Directives Tailwind CSS et styles globaux
│   └── main.jsx                 # Point d'entrée React 18 avec CartProvider & BrowserRouter
├── .env                         # Variables d'environnement (VITE_API_URL)
├── .gitignore                   # Fichiers exclus du versionnement
├── index.html                   # Document HTML racine
├── package.json                 # Scripts et dépendances
├── postcss.config.js            # Configuration PostCSS pour Tailwind
├── tailwind.config.js           # Configuration Tailwind CSS
└── vite.config.js               # Configuration du bundler Vite (port 3000)
```

---

## 🛠️ Démarrage du Projet

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run dev
```
L'application démarre sur [http://localhost:3000](http://localhost:3000).

### 3. Compiler pour la production
```bash
npm run build
```
Les fichiers compilés et minifiés sont générés dans le dossier `dist/`.

---

## 🧪 Grille de Validation des Critères

| Critère | Statut | Détail d'implémentation |
| :--- | :---: | :--- |
| **Navigation fluide** | ✅ Conforme | Navigation entre `/`, `/product/:id` et `/cart` sans rechargement de page |
| **Persistance LocalStorage** | ✅ Conforme | Le rechargement F5 conserve l'intégralité des articles et quantités |
| **Appels Asynchrones réels** | ✅ Conforme | FakeStore API avec skeletons de chargement et gestion d'erreurs |
| **Immuabilité du State** | ✅ Conforme | Mises à jour avec `.map()`, `.filter()`, et décomposition `...` |
| **Responsive Design** | ✅ Conforme | Grille Tailwind adaptative Mobile (1 col), Tablette (2-3 cols), Desktop (4 cols) |
