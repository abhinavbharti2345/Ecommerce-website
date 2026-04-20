import { createContext, useContext, useState, useCallback } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    // ─── Cart Actions ─────────────────────────────────────────────────────────

    const addToCart = useCallback((product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.productId === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                },
            ];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    }, []);

    const updateQuantity = useCallback((productId, qty) => {
        if (qty < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity: qty } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => setCartItems([]), []);

    // ─── Wishlist Actions ─────────────────────────────────────────────────────

    const addToWishlist = useCallback((product) => {
        setWishlistItems((prev) => {
            if (prev.find((item) => item.productId === product.id)) return prev;
            return [
                ...prev,
                {
                    productId: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    category: product.category,
                },
            ];
        });
    }, []);

    const removeFromWishlist = useCallback((productId) => {
        setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
    }, []);

    const isInWishlist = useCallback(
        (productId) => wishlistItems.some((item) => item.productId === productId),
        [wishlistItems]
    );

    const isInCart = useCallback(
        (productId) => cartItems.some((item) => item.productId === productId),
        [cartItems]
    );

    // ─── Derived State ────────────────────────────────────────────────────────

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const wishlistCount = wishlistItems.length;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                wishlistItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                isInCart,
                cartCount,
                cartTotal,
                wishlistCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCartContext must be used within a CartProvider');
    return ctx;
};
