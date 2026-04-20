import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    HiOutlineShoppingCart,
    HiOutlineHeart,
    HiOutlineMenu,
    HiOutlineX,
} from 'react-icons/hi';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/wishlist', label: 'Wishlist' },
        { to: '/cart', label: 'Cart' },
    ];

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-accent' : 'text-charcoal hover:text-accent'
        }`;

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-orange-200/50 shadow-sm">
            <div className="page-container">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-bold text-accent tracking-tight group-hover:text-accent-dark transition-colors">
                            Shop<span className="text-charcoal">Sphere</span>
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink to={to} className={linkClass} end={to === '/'}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Icon group */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className="relative p-2 text-charcoal hover:text-accent transition-colors duration-200"
                            aria-label="Wishlist"
                        >
                            <HiOutlineHeart size={22} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" aria-label="Shopping cart">
                            <button className="btn-primary relative gap-2">
                                <HiOutlineShoppingCart size={18} />
                                Cart
                                {cartCount > 0 && (
                                    <span className="ml-1 min-w-[20px] h-5 flex items-center justify-center bg-white text-accent text-xs font-bold rounded-full px-1">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 text-charcoal hover:text-accent transition-colors"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-background border-t border-orange-200/50 px-4 pb-4">
                    <ul className="flex flex-col gap-4 pt-4">
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    className={linkClass}
                                    end={to === '/'}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-orange-200/50">
                        <Link
                            to="/wishlist"
                            className="flex items-center gap-1.5 text-sm text-charcoal hover:text-accent"
                            onClick={() => setMenuOpen(false)}
                        >
                            <HiOutlineHeart size={18} />
                            Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                        </Link>
                        <Link
                            to="/cart"
                            className="flex items-center gap-1.5 text-sm text-charcoal hover:text-accent"
                            onClick={() => setMenuOpen(false)}
                        >
                            <HiOutlineShoppingCart size={18} />
                            Cart {cartCount > 0 && `(${cartCount})`}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
