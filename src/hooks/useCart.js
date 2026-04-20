import { useCartContext } from '../context/CartContext';

/**
 * Convenience hook exposing cart state and actions from CartContext.
 */
const useCart = () => {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount,
        cartTotal,
    } = useCartContext();

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount,
        cartTotal,
    };
};

export default useCart;
