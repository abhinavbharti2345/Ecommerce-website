import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { formatPrice, truncate } from '../utils/helpers';
import useCart from '../hooks/useCart';

const CartItem = ({ item }) => {
    const { productId, title, image, price, quantity } = item;
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div className="card p-4 flex gap-4 items-start group">
            {/* Product Image */}
            <Link to={`/products/${productId}`} className="shrink-0">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 overflow-hidden shadow-sm border border-orange-50">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain"
                    />
                </div>
            </Link>

            {/* Details */}
            <div className="flex flex-col flex-1 gap-1.5">
                <Link to={`/products/${productId}`}>
                    <h3 className="text-sm font-semibold text-charcoal hover:text-accent transition-colors leading-snug">
                        {truncate(title, 70)}
                    </h3>
                </Link>
                <span className="text-xs text-muted">{formatPrice(price)} each</span>

                {/* Quantity controls + subtotal */}
                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                quantity === 1
                                    ? removeFromCart(productId)
                                    : updateQuantity(productId, quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-orange-200 hover:bg-orange-50 text-charcoal transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <HiOutlineMinus size={13} />
                        </button>
                        <span className="text-sm font-semibold text-charcoal w-5 text-center">
                            {quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(productId, quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-orange-200 hover:bg-orange-50 text-charcoal transition-colors"
                            aria-label="Increase quantity"
                        >
                            <HiOutlinePlus size={13} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-base font-bold text-charcoal">
                            {formatPrice(price * quantity)}
                        </span>
                        <button
                            onClick={() => removeFromCart(productId)}
                            className="p-1.5 text-muted hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            aria-label="Remove from cart"
                        >
                            <HiOutlineTrash size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
