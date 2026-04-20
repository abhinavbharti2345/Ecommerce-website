import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineLightningBolt } from 'react-icons/hi';
import { capitalize } from '../utils/helpers';
import ProductGrid from '../components/ProductGrid';
import useProducts from '../hooks/useProducts';

const CATEGORY_ICONS = {
    electronics: '🔌',
    jewelery: '💎',
    "men's clothing": '👔',
    "women's clothing": '👗',
};

const Home = () => {
    const { products, categories, loading, error } = useProducts();

    useEffect(() => {
        document.title = 'ShopSphere — Home';
    }, []);

    const featured = products.slice(0, 8);

    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-orange-50 to-background">
                <div className="page-container py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <span className="inline-flex items-center gap-1.5 badge bg-accent/10 text-accent mb-4 px-3 py-1 rounded-full text-xs font-semibold">
                            <HiOutlineLightningBolt size={12} /> New arrivals every week
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-5">
                            Discover Products{' '}
                            <span className="text-accent">You'll Love</span>
                        </h1>
                        <p className="text-lg text-muted max-w-xl mb-8 leading-relaxed">
                            Browse thousands of curated products across electronics, fashion, jewellery
                            and more — all at great prices.
                        </p>
                        <Link to="/products" className="btn-primary gap-2 text-base px-7 py-3 rounded-2xl shadow-md hover:shadow-lg">
                            Shop Now
                            <HiArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>

                {/* decorative blobs */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-40 w-56 h-56 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />
            </section>

            {/* ── Category Quick-Links ─────────────────────────────────────────── */}
            {!loading && categories.length > 0 && (
                <section className="page-container">
                    <h2 className="section-heading mb-6">Shop by Category</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                to={`/products?category=${cat}`}
                                className="card p-6 flex flex-col items-center gap-3 hover:border hover:border-accent/30 hover:-translate-y-1 transition-transform duration-200 cursor-pointer group text-center"
                            >
                                <span className="text-4xl">{CATEGORY_ICONS[cat] ?? '🛒'}</span>
                                <span className="text-sm font-semibold text-charcoal group-hover:text-accent transition-colors">
                                    {capitalize(cat)}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Featured Products ────────────────────────────────────────────── */}
            <section className="page-container">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="section-heading">Featured Products</h2>
                    <Link
                        to="/products"
                        className="text-sm font-medium text-accent hover:text-accent-dark flex items-center gap-1 transition-colors"
                    >
                        View all <HiArrowRight size={15} />
                    </Link>
                </div>
                <ProductGrid products={featured} loading={loading} error={error} />
            </section>
        </div>
    );
};

export default Home;
