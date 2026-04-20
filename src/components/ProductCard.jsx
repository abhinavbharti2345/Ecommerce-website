import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHeart, HiOutlineHeart, HiOutlineShoppingCart, HiStar } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { formatPrice, truncate, parseRating, capitalize } from '../utils/helpers';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';

const StarRating = ({ rate }) => {
    const { full, half, empty } = parseRating(rate);
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: full }).map((_, i) => (
                <HiStar key={`f${i}`} className="text-amber-400 w-3.5 h-3.5" />
            ))}
            {half === 1 && (
                <div className="relative w-3.5 h-3.5">
                    <HiStar className="text-orange-100 w-3.5 h-3.5 absolute" />
                    <div className="overflow-hidden w-1/2 absolute">
                        <HiStar className="text-amber-400 w-3.5 h-3.5" />
                    </div>
                </div>
            )}
            {Array.from({ length: empty }).map((_, i) => (
                <HiStar key={`e${i}`} className="text-orange-100 w-3.5 h-3.5" />
            ))}
        </div>
    );
};

const ProductCard = ({ product }) => {
    const { id, title, price, image, category, rating } = product;
    const { addToCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const wishlisted = isInWishlist(id);
    const inCart = isInCart(id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        toast.success(`"${truncate(title, 30)}" added to cart!`, { autoClose: 2000 });
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (wishlisted) {
            removeFromWishlist(id);
            toast.info('Removed from wishlist', { autoClose: 1800 });
        } else {
            addToWishlist(product);
            toast.success('Added to wishlist ❤️', { autoClose: 1800 });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card group flex flex-col h-full"
        >
            <Link to={`/products/${id}`} className="flex flex-col h-full">
                {/* Image container */}
                <div className="relative bg-white h-52 flex items-center justify-center p-5 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Wishlist toggle */}
                    <button
                        onClick={handleWishlistToggle}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform duration-200"
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        {wishlisted ? (
                            <HiHeart className="text-red-500 w-4 h-4" />
                        ) : (
                            <HiOutlineHeart className="text-muted w-4 h-4" />
                        )}
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4 gap-2">
                    {/* Category badge */}
                    <span className="badge bg-secondary/15 text-secondary-dark px-2 py-0.5 self-start rounded-full">
                        {capitalize(category)}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-charcoal leading-snug flex-1">
                        {truncate(title, 58)}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                        <StarRating rate={rating?.rate ?? 0} />
                        <span className="text-xs text-muted">
                            {rating?.rate} ({rating?.count})
                        </span>
                    </div>

                    {/* Price + button */}
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-lg font-bold text-charcoal">
                            {formatPrice(price)}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl transition-all duration-200 ${inCart
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-accent text-white hover:bg-accent-dark active:scale-95'
                                }`}
                        >
                            <HiOutlineShoppingCart size={15} />
                            {inCart ? 'In Cart' : 'Add'}
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
