# StoreMaster React

Application Single Page (SPA) e-commerce concue et developpee en mars 2026 dans le cadre de l'apprentissage approfondi de la bibliotheque React.

Auteur : Lucien HAIKOU  
Date : Mars 2026  
Technologies : React 18, Vite, React Router v6, Tailwind CSS, Context API, FakeStore API

---

## Presentation du projet

StoreMaster est une application web d'e-commerce realisee selon un cahier des charges fonctionnel et technique rigoureux. L'objectif principal de ce projet, mene en mars 2026, est de consolider et de demontrer la maitrise des concepts fondamentaux et avances de React moderne :
- Composants fonctionnels et JSX declaratif
- Gestion d'etat local et global avec les Hooks standard (useState, useEffect, useMemo, useContext)
- Creation de hooks personnalises (useCart)
- Routage cote client sans rechargement de page avec React Router v6 et routes dynamiques
- Consommation d'une API REST externe (FakeStore API) avec gestion asynchrone, indicateurs de chargement et traitement des erreurs
- Persistance de donnees dans le navigateur avec le Web Storage (localStorage)
- Interface responsive, moderne et accessible avec Tailwind CSS

---

## Fonctionnalites cles

### 1. Exploration du catalogue (F1)
- Recuperation asynchrone des donnees produits au montage du composant principal via fetch dans un useEffect.
- Affichage d'un composant de chargement avec squelettes visuels (skeletons) pendant l'attente du reseau.
- Gestion d'erreurs reseau avec possibilite de reessayer la requete en cas de defaillance.
- Affichage des articles dans une grille responsive avec ProductList et ProductCard, utilisant des cles stables et uniques.

### 2. Recherche et filtrage multi-criteres (F2)
- Barre de recherche textuelle reactive controlee par l'etat React, filtrant en temps reel sur les titres et descriptions.
- Filtrage par categories dynamiques issues de l'API (Vetements Homme, Vetements Femme, Bijoux, Electronique).
- Tri avance des articles : par pertinence, par prix croissant ou decroissant, par notes moyennes des avis, ou par ordre alphabetique.
- Calcul combine optimise en memoire grace au hook useMemo, sans requete reseau inutile.

### 3. Fiche produit detaillee et routage dynamique (F3)
- Navigation sans rechargement de page via le composant Link vers la route dynamique /product/:id.
- Extraction de l'identifiant du produit via le hook useParams.
- Requete specifique pour recuperer les details du produit selectionne.
- Affichage de l'image agrandie, du fil d'Ariane, des notes et avis clients, de la description detaillee et du selecteur de quantite.

### 4. Gestion globale du panier (F4 - CartContext)
- Etat global du panier partage dans toute l'application grace a l'API Context (CartContext) et au hook useCart, supprimant le passage de proprietes en cascade (prop drilling).
- Ajout au panier avec mise a jour immuable : incrementation de la quantite si le produit est deja present, ou creation d'une nouvelle ligne avec quantite initiale.
- Ajustement des quantites (+ / -) avec suppression automatique de l'article des que la quantite atteint zero.
- Suppression manuelle d'un article a l'aide de filter.
- Reinitialisation complete du panier (vider le panier).
- Calcul dynamique du nombre total d'articles et du montant cumule a l'aide de la methode reduce.
- Badge dynamique dans la barre de navigation mis a jour instantanement a chaque interaction.
- Indicateur visuel d'eligibilite a la livraison offerte et formulaire modal de simulation de commande.

### 5. Persistance locale des donnees (F5 - LocalStorage)
- Initialisation paresseuse de l'etat du panier a partir des donnees stockees dans le localStorage lors de l'ouverture ou du rafraichissement de la page (F5).
- Synchronisation automatique et systematique a chaque mutation du panier par le biais d'un hook useEffect dedie.

---

## Architecture du projet

```
storemaster-react/
├── public/
│   ├── favicon.svg              # Favicon vectoriel de l'application
│   ├── hero-illustration.png    # Composition graphique brute
│   └── hero-products.png        # Visuel detoure des produits phares
├── src/
│   ├── components/              # Composants UI modulaires et reutilisables
│   │   ├── CartItem.jsx         # Ligne du panier avec ajustement de quantite
│   │   ├── Loader.jsx           # Spinner et squelettes d'attente animes
│   │   ├── Navbar.jsx           # En-tete de navigation et badge reactif
│   │   ├── ProductCard.jsx      # Carte individuelle de produit
│   │   ├── ProductList.jsx      # Grille adaptative des articles
│   │   └── SearchBar.jsx        # Recherche texte, tri et boutons de categories
│   ├── context/
│   │   └── CartContext.jsx      # CartProvider et custom hook useCart avec localStorage
│   ├── pages/                   # Vues associees aux routes de l'application
│   │   ├── CartPage.jsx         # Page de gestion du panier et validation d'achat
│   │   ├── HomePage.jsx         # Page d'accueil avec hero banner et catalogue
│   │   ├── NotFound.jsx         # Page 404 pour les routes inconnues
│   │   └── ProductDetail.jsx    # Page de details pour un produit specifique
│   ├── services/
│   │   └── api.js               # Centralisation des requetes HTTP vers FakeStore API
│   ├── App.jsx                  # Configuration du routage et gabarit general
│   ├── index.css                # Directives Tailwind et styles globaux
│   └── main.jsx                 # Point d'entree de l'application React avec BrowserRouter
├── .env                         # Variables d'environnement (URL de l'API)
├── .gitignore                   # Fichiers exclus du suivi de version
├── index.html                   # Fichier HTML racine
├── package.json                 # Dependances et scripts de commande
├── postcss.config.js            # Configuration du processeur CSS
├── tailwind.config.js           # Parametrage des themes et utilitaires Tailwind
└── vite.config.js               # Configuration du bundler Vite
```

---

## Installation et execution locale

### Pre-requis
- Node.js (version 18 ou superieure recommandee)
- npm (gestionnaire de paquets livre avec Node.js)

### 1. Cloner le depot
```bash
git clone https://github.com/lhdev10/storemaster.git
cd storemaster
```

### 2. Installer les dependances
```bash
npm install
```

### 3. Lancer le serveur de developpement
```bash
npm run dev
```
L'application est alors accessible a l'adresse : http://localhost:3000

### 4. Compiler pour la production
```bash
npm run build
```
Les fichiers distribues, compiles et optimises sont generes dans le dossier `dist/`.

---

## Validation des criteres d'acceptation

| Critere technique | Etat | Description |
| :--- | :---: | :--- |
| Navigation fluide SPA | Conforme | Transition instantanee entre l'accueil, les fiches produits et le panier sans rechargement de page |
| Persistance des donnees | Conforme | Les articles et quantites du panier sont conserves apres un rafraichissement navigateur (F5) |
| Donnees asynchrones reelles | Conforme | Requetes HTTP vers FakeStore API avec indicateur visuel de chargement et gestion des erreurs |
| Immuabilite du state | Conforme | Toutes les mises a jour de state utilisent des copies immutables via map, filter et destructuration |
| Design responsive | Conforme | Interface optimisee pour mobiles, tablettes et ecrans de bureau avec classes Tailwind CSS |

---

## Licence

Projet personnel concu a des fins pedagogiques par Lucien HAIKOU (Mars 2026).
