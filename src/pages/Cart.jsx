import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineShoppingBag, HiArrowRight } from 'react-icons/hi';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';

const Cart = () => {
    const { cartItems, cartTotal } = useCart();
    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + tax;

    useEffect(() => {
        document.title = 'ShopSphere — Cart';
    }, []);

    if (!cartItems.length) {
        return (
            <div className="page-container py-24 flex flex-col items-center gap-6 text-center">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
                    <HiOutlineShoppingBag size={40} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal">Your cart is empty</h2>
                <p className="text-muted max-w-sm">
                    Looks like you haven't added any products yet. Start exploring!
                </p>
                <Link to="/products" className="btn-primary gap-2 mt-2">
                    Start Shopping <HiArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="page-container py-10">
            <h1 className="section-heading text-3xl mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Cart items */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="lg:col-span-2 flex flex-col gap-4"
                >
                    {cartItems.map((item) => (
                        <CartItem key={item.productId} item={item} />
                    ))}
                </motion.div>

                {/* Order summary */}
                <div className="card p-6 flex flex-col gap-4 sticky top-24">
                    <h2 className="text-lg font-bold text-charcoal border-b border-orange-200/60 pb-4">
                        Order Summary
                    </h2>

                    <div className="flex flex-col gap-2 text-sm text-muted">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="flex justify-between">
                                <span className="truncate max-w-[180px]">
                                    {item.title.slice(0, 25)}… ×{item.quantity}
                                </span>
                                <span className="font-medium text-charcoal">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-orange-200/60 pt-3 flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-muted">
                            <span>Subtotal</span>
                            <span className="text-charcoal font-medium">{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted">
                            <span>Tax (8%)</span>
                            <span className="text-charcoal font-medium">{formatPrice(tax)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base text-charcoal border-t border-orange-200/60 pt-2 mt-1">
                            <span>Total</span>
                            <span>{formatPrice(grandTotal)}</span>
                        </div>
                    </div>

                    <Link to="/checkout" className="btn-primary w-full justify-center gap-2 mt-2 py-3 text-base">
                        Proceed to Checkout <HiArrowRight size={18} />
                    </Link>
                    <Link to="/products" className="btn-ghost w-full justify-center text-sm">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
