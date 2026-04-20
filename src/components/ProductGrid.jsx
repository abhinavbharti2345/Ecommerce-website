import ProductCard from './ProductCard';

const SkeletonCard = () => (
    <div className="card flex flex-col h-full">
        <div className="skeleton h-52 rounded-b-none" />
        <div className="p-4 flex flex-col gap-3">
            <div className="skeleton h-4 w-20 rounded-full" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
            <div className="flex justify-between items-center mt-1">
                <div className="skeleton h-6 w-16 rounded" />
                <div className="skeleton h-8 w-20 rounded-xl" />
            </div>
        </div>
    </div>
);

const ProductGrid = ({ products, loading, error }) => {
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="text-5xl">😕</span>
                <p className="text-muted text-lg">Failed to load products.</p>
                <p className="text-sm text-muted">{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="text-5xl">🔍</span>
                <p className="text-charcoal text-lg font-semibold">No products found</p>
                <p className="text-muted text-sm">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
