import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

const SearchBar = ({ value, onChange, placeholder = 'Search products…' }) => {
    return (
        <div className="relative w-full max-w-md">
            <HiOutlineSearch
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
                type="search"
                id="product-search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="input-field pl-10 pr-10"
                autoComplete="off"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors"
                    aria-label="Clear search"
                >
                    <HiOutlineX size={16} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
