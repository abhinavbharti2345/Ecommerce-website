import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useDebounce from '../hooks/useDebounce';
import { applyFilters } from '../utils/helpers';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';

const Products = () => {
    const { products, categories, loading, error } = useProducts();
    const [searchParams] = useSearchParams();

    const initialCategory = searchParams.get('category') || 'all';

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        document.title = 'ShopSphere — Products';
    }, []);

    const filtered = applyFilters(products, {
        search: debouncedSearch,
        category,
        priceRange,
        sortBy,
    });

    return (
        <div className="page-container py-10">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="section-heading text-3xl">All Products</h1>
                <p className="text-muted text-sm">
                    {loading ? 'Loading…' : `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
                </p>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col gap-6 mb-8">
                <SearchBar value={search} onChange={setSearch} />
                <Filters
                    categories={categories}
                    activeCategory={category}
                    onCategoryChange={setCategory}
                    activePriceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    activeSort={sortBy}
                    onSortChange={setSortBy}
                />
            </div>

            {/* Grid */}
            <ProductGrid products={filtered} loading={loading} error={error} />
        </div>
    );
};

export default Products;
