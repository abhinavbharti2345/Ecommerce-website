import { useCartContext } from '../context/CartContext';

/**
 * Convenience hook exposing wishlist state and actions from CartContext.
 */
const useWishlist = () => {
    const {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
    } = useCartContext();

    return {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
    };
};

export default useWishlist;
