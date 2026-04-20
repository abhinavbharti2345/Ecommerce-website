import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HiArrowLeft,
    HiHeart,
    HiOutlineHeart,
    HiOutlineShoppingCart,
    HiStar,
} from 'react-icons/hi';
import { toast } from 'react-toastify';
import { getProductById } from '../services/api';
import { formatPrice, capitalize, parseRating, toINR } from '../utils/helpers';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';

const StarRating = ({ rate }) => {
    const { full, half, empty } = parseRating(rate);
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: full }).map((_, i) => (
                <HiStar key={`f${i}`} className="text-amber-400 w-5 h-5" />
            ))}
            {half === 1 && (
                <div className="relative w-5 h-5">
                    <HiStar className="text-orange-100 w-5 h-5 absolute" />
                    <div className="overflow-hidden w-1/2 absolute">
                        <HiStar className="text-amber-400 w-5 h-5" />
                    </div>
                </div>
            )}
            {Array.from({ length: empty }).map((_, i) => (
                <HiStar key={`e${i}`} className="text-orange-100 w-5 h-5" />
            ))}
        </div>
    );
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        getProductById(id)
            .then((res) => {
                if (!cancelled) {
                    const product = { ...res.data, price: toINR(res.data.price) };
                    setProduct(product);
                    document.title = `ShopSphere — ${product.title}`;
                }
            })
            .catch((err) => {
                if (!cancelled) setError(err.message || 'Failed to load product.');
            })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [id]);

    if (loading) {
        return (
            <div className="page-container py-10">
                <div className="grid md:grid-cols-2 gap-12 animate-pulse">
                    <div className="skeleton h-96 rounded-2xl" />
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-5 w-24 rounded-full" />
                        <div className="skeleton h-8 w-full rounded" />
                        <div className="skeleton h-8 w-2/3 rounded" />
                        <div className="skeleton h-4 w-32 rounded" />
                        <div className="skeleton h-24 w-full rounded" />
                        <div className="skeleton h-12 w-48 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container py-24 text-center">
                <p className="text-muted text-lg">{error}</p>
                <button onClick={() => navigate(-1)} className="btn-secondary mt-4">
                    Go Back
                </button>
            </div>
        );
    }

    if (!product) return null;

    const { title, price, description, category, image, rating } = product;
    const wishlisted = isInWishlist(product.id);
    const inCart = isInCart(product.id);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success('Added to cart!', { autoClose: 2000 });
    };

    const handleWishlistToggle = () => {
        if (wishlisted) {
            removeFromWishlist(product.id);
            toast.info('Removed from wishlist', { autoClose: 1800 });
        } else {
            addToWishlist(product);
            toast.success('Added to wishlist ❤️', { autoClose: 1800 });
        }
    };

    return (
        <div className="page-container py-10">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="btn-ghost mb-8 -ml-2 gap-2"
            >
                <HiArrowLeft size={18} /> Back
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-12 items-start"
            >
                {/* Image */}
                <div className="card p-10 flex items-center justify-center bg-white min-h-80 border border-orange-100">
                    <img
                        src={image}
                        alt={title}
                        className="max-h-80 w-full object-contain"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-5">
                    <span className="badge bg-secondary/10 text-secondary-dark self-start rounded-full px-3 py-1">
                        {capitalize(category)}
                    </span>

                    <h1 className="text-2xl md:text-3xl font-bold text-charcoal leading-snug">
                        {title}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <StarRating rate={rating?.rate ?? 0} />
                        <span className="text-sm text-muted">
                            {rating?.rate}/5 · {rating?.count} reviews
                        </span>
                    </div>

                    <p className="text-4xl font-bold text-charcoal">{formatPrice(price)}</p>

                    <p className="text-muted text-sm leading-relaxed border-t border-orange-200/60 pt-4">
                        {description}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-2">
                        <button
                            onClick={handleAddToCart}
                            className={`btn-primary gap-2 px-6 py-3 text-base ${inCart ? 'bg-green-600 hover:bg-green-700' : ''
                                }`}
                        >
                            <HiOutlineShoppingCart size={20} />
                            {inCart ? 'In Cart — Add More' : 'Add to Cart'}
                        </button>

                        <button
                            onClick={handleWishlistToggle}
                            className="btn-secondary gap-2 px-6 py-3 text-base"
                        >
                            {wishlisted ? (
                                <>
                                    <HiHeart className="text-red-500" size={20} /> Wishlisted
                                </>
                            ) : (
                                <>
                                    <HiOutlineHeart size={20} /> Wishlist
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductDetails;
