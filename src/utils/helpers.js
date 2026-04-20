/** 1 USD → INR conversion rate (update periodically) */
export const USD_TO_INR = 84;

/**
 * Convert a USD price to INR.
 * @param {number} usdPrice
 * @returns {number}
 */
export const toINR = (usdPrice) => Math.round(usdPrice * USD_TO_INR);

/**
 * Format a price number to INR currency string.
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

/**
 * Truncate a string to a max length and append ellipsis if needed.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (str, maxLength = 60) =>
    str && str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

/**
 * Capitalize the first letter of each word in a string.
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) =>
    str ? str.replace(/\b\w/g, (c) => c.toUpperCase()) : '';

/**
 * Return star-rating full/half/empty counts from a numeric rating.
 * @param {number} rate  — 0 to 5
 * @returns {{ full: number, half: number, empty: number }}
 */
export const parseRating = (rate = 0) => {
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return { full, half, empty };
};

/**
 * Get price range label string from a max price.
 * @param {string} range
 * @returns {[number, number]}
 */
export const getPriceRange = (range) => {
    switch (range) {
        case '0-2000':     return [0, 2000];
        case '2000-10000': return [2000, 10000];
        case '10000-30000': return [10000, 30000];
        case '30000+':     return [30000, Infinity];
        default:           return [0, Infinity];
    }
};

/**
 * Filter and sort a products array given search, category, price, and sort params.
 * @param {Array} products
 * @param {string} search
 * @param {string} category
 * @param {string} priceRange
 * @param {string} sortBy
 * @returns {Array}
 */
export const applyFilters = (products, { search, category, priceRange, sortBy }) => {
    let result = [...products];

    if (search) {
        const q = search.toLowerCase();
        result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (category && category !== 'all') {
        result = result.filter((p) => p.category === category);
    }

    const [minPrice, maxPrice] = getPriceRange(priceRange);
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    switch (sortBy) {
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'rating-desc':
            result.sort((a, b) => b.rating.rate - a.rating.rate);
            break;
        default:
            break;
    }

    return result;
};
