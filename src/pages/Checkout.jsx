import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import useCart from '../hooks/useCart';
import { formatPrice, truncate } from '../utils/helpers';

const schema = yup.object({
    name: yup.string().required('Full name is required').min(2, 'Name too short'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    address: yup.string().required('Delivery address is required').min(10, 'Address too short'),
    city: yup.string().required('City is required'),
    zip: yup
        .string()
        .required('ZIP code is required')
        .matches(/^\d{5,6}$/, 'ZIP must be 5-6 digits'),
});

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + tax;

    useEffect(() => {
        document.title = 'ShopSphere — Checkout';
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 800)); // simulate async
        toast.success('🎉 Order placed successfully! Thank you for shopping with us.', {
            autoClose: 3500,
        });
        clearCart();
        navigate('/');
    };

    if (!cartItems.length) {
        return (
            <div className="page-container py-24 text-center">
                <p className="text-muted text-lg">Your cart is empty. Nothing to checkout!</p>
            </div>
        );
    }

    return (
        <div className="page-container py-10">
            <h1 className="section-heading text-3xl mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-5 gap-10 items-start">
                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-3 card p-8 flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <h2 className="text-lg font-bold text-charcoal">Shipping Information</h2>

                    {/* Name */}
                    <div>
                        <label htmlFor="checkout-name" className="block text-sm font-medium text-charcoal mb-1.5">
                            Full Name
                        </label>
                        <input
                            id="checkout-name"
                            type="text"
                            placeholder="John Doe"
                            {...register('name')}
                            className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="checkout-email" className="block text-sm font-medium text-charcoal mb-1.5">
                            Email Address
                        </label>
                        <input
                            id="checkout-email"
                            type="email"
                            placeholder="john@example.com"
                            {...register('email')}
                            className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="checkout-address" className="block text-sm font-medium text-charcoal mb-1.5">
                            Delivery Address
                        </label>
                        <input
                            id="checkout-address"
                            type="text"
                            placeholder="123 Main Street, Apt 4B"
                            {...register('address')}
                            className={`input-field ${errors.address ? 'border-red-400 focus:ring-red-300' : ''}`}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                        )}
                    </div>

                    {/* City + ZIP */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="checkout-city" className="block text-sm font-medium text-charcoal mb-1.5">
                                City
                            </label>
                            <input
                                id="checkout-city"
                                type="text"
                                placeholder="New York"
                                {...register('city')}
                                className={`input-field ${errors.city ? 'border-red-400 focus:ring-red-300' : ''}`}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="checkout-zip" className="block text-sm font-medium text-charcoal mb-1.5">
                                ZIP Code
                            </label>
                            <input
                                id="checkout-zip"
                                type="text"
                                placeholder="10001"
                                {...register('zip')}
                                className={`input-field ${errors.zip ? 'border-red-400 focus:ring-red-300' : ''}`}
                            />
                            {errors.zip && (
                                <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary py-3 text-base gap-2 mt-2"
                    >
                        <HiOutlineCheckCircle size={20} />
                        {isSubmitting ? 'Placing Order…' : 'Place Order'}
                    </button>
                </motion.form>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 card p-6 flex flex-col gap-4 sticky top-24"
                >
                    <h2 className="text-lg font-bold text-charcoal border-b border-orange-200/60 pb-4">
                        Order Summary
                    </h2>

                    <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="flex gap-3 items-center">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 p-1 border border-orange-50">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-charcoal truncate">
                                        {truncate(item.title, 35)}
                                    </p>
                                    <p className="text-xs text-muted">Qty: {item.quantity}</p>
                                </div>
                                <span className="text-sm font-semibold text-charcoal shrink-0">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-orange-200/60 pt-4 flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-muted">
                            <span>Subtotal</span>
                            <span className="text-charcoal font-medium">{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted">
                            <span>Tax (8%)</span>
                            <span className="text-charcoal font-medium">{formatPrice(tax)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base text-charcoal border-t border-orange-200/60 pt-2 mt-1">
                            <span>Grand Total</span>
                            <span>{formatPrice(grandTotal)}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Checkout;
