import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineShoppingCart, HiOutlineTrash, HiArrowRight } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { formatPrice, truncate } from '../utils/helpers';
import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart, isInCart } = useCart();

    useEffect(() => {
        document.title = 'ShopSphere — Wishlist';
    }, []);

    const handleAddToCart = (item) => {
        addToCart({
            id: item.productId,
            title: item.title,
            image: item.image,
            price: item.price,
            category: item.category,
        });
        toast.success('Added to cart!', { autoClose: 2000 });
    };

    const handleRemove = (productId, title) => {
        removeFromWishlist(productId);
        toast.info(`Removed "${truncate(title, 25)}" from wishlist`, { autoClose: 1800 });
    };

    if (!wishlistItems.length) {
        return (
            <div className="page-container py-24 flex flex-col items-center gap-6 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
                    <HiOutlineHeart size={40} className="text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal">Your wishlist is empty</h2>
                <p className="text-muted max-w-sm">
                    Save your favourite products here and come back to them anytime.
                </p>
                <Link to="/products" className="btn-primary gap-2 mt-2">
                    Browse Products <HiArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="page-container py-10">
            <h1 className="section-heading text-3xl mb-2">Wishlist</h1>
            <p className="text-muted text-sm mb-8">{wishlistItems.length} saved item{wishlistItems.length !== 1 ? 's' : ''}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {wishlistItems.map((item) => (
                    <motion.div
                        key={item.productId}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="card flex flex-col h-full"
                    >
                        <Link
                            to={`/products/${item.productId}`}
                            className="h-48 bg-white flex items-center justify-center p-5 overflow-hidden border-b border-orange-50"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
                            />
                        </Link>

                        <div className="p-4 flex flex-col gap-2 flex-1">
                            <Link to={`/products/${item.productId}`}>
                                <h3 className="text-sm font-semibold text-charcoal hover:text-accent transition-colors leading-snug">
                                    {truncate(item.title, 55)}
                                </h3>
                            </Link>
                            <span className="text-lg font-bold text-charcoal mt-auto pt-2">
                                {formatPrice(item.price)}
                            </span>

                            <div className="flex gap-2 mt-1">
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${isInCart(item.productId)
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'btn-primary'
                                        }`}
                                >
                                    <HiOutlineShoppingCart size={14} />
                                    {isInCart(item.productId) ? 'In Cart' : 'Add to Cart'}
                                </button>
                                <button
                                    onClick={() => handleRemove(item.productId, item.title)}
                                    className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    aria-label="Remove from wishlist"
                                >
                                    <HiOutlineTrash size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
