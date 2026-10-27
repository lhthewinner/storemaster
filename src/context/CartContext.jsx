import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'storemaster_cart';

export function CartProvider({ children }) {
  // Initialisation paresseuse depuis le localStorage (F5)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error('Erreur de lecture du panier dans le localStorage:', error);
    }
    return [];
  });

  // Synchronisation avec localStorage à chaque modification du panier (F5)
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans le localStorage:', error);
    }
  }, [cart]);

  // Ajouter au panier (F4)
  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        // Incrémentation immuable si l'article existe déjà
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }

      // Ajout du nouvel article avec sa quantité
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantityToAdd,
      };

      return [...prevCart, newItem];
    });
  };

  // Modifier la quantité (+1 ou -1) : si quantité <= 0, suppression automatique (F4)
  const updateQuantity = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const nextQuantity = item.quantity + delta;
            return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
          }
          return item;
        })
        .filter(Boolean); // Retire les éléments devenus null (quantité <= 0)
    });
  };

  // Suppression unitaire avec .filter() (F4)
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vider complètement le panier (F4)
  const clearCart = () => {
    setCart([]);
  };

  // Total cumulé du nombre d'articles via .reduce() (F4)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Montant total du panier via .reduce()
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personnalisé pour consommer le CartContext facilement
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé à l\'intérieur d\'un <CartProvider>');
  }
  return context;
}
