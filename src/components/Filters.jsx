import { capitalize } from '../utils/helpers';

const PRICE_RANGES = [
    { label: 'All Prices',          value: 'all' },
    { label: 'Under ₹2,000',        value: '0-2000' },
    { label: '₹2,000 – ₹10,000',   value: '2000-10000' },
    { label: '₹10,000 – ₹30,000',  value: '10000-30000' },
    { label: '₹30,000+',           value: '30000+' },
];

const SORT_OPTIONS = [
    { label: 'Default', value: 'default' },
    { label: 'Price: Low → High', value: 'price-asc' },
    { label: 'Price: High → Low', value: 'price-desc' },
    { label: 'Rating: High → Low', value: 'rating-desc' },
];

const Filters = ({
    categories = [],
    activeCategory,
    onCategoryChange,
    activePriceRange,
    onPriceRangeChange,
    activeSort,
    onSortChange,
}) => {
    return (
        <div className="flex flex-col gap-5">
            {/* Category pills */}
            <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2.5">
                    Category
                </p>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onCategoryChange('all')}
                        className={`badge px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${activeCategory === 'all'
                                ? 'bg-accent text-white shadow-sm'
                                : 'bg-white border border-transparent text-charcoal shadow-sm hover:border-orange-200 hover:bg-orange-50'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${activeCategory === cat
                                    ? 'bg-accent text-white shadow-sm'
                                    : 'bg-white border border-transparent text-charcoal shadow-sm hover:border-orange-200 hover:bg-orange-50'
                                }`}
                        >
                            {capitalize(cat)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price range + Sort row */}
            <div className="flex flex-wrap gap-4 items-end">
                {/* Price range */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="price-range"
                        className="text-xs font-semibold text-muted uppercase tracking-wider"
                    >
                        Price Range
                    </label>
                    <select
                        id="price-range"
                        value={activePriceRange}
                        onChange={(e) => onPriceRangeChange(e.target.value)}
                        className="input-field w-auto pr-8 cursor-pointer"
                    >
                        {PRICE_RANGES.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="sort-by"
                        className="text-xs font-semibold text-muted uppercase tracking-wider"
                    >
                        Sort By
                    </label>
                    <select
                        id="sort-by"
                        value={activeSort}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="input-field w-auto pr-8 cursor-pointer"
                    >
                        {SORT_OPTIONS.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filters;
