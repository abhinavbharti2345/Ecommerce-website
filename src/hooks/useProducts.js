import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';
import { toINR } from '../utils/helpers';

/**
 * Fetches all products and categories from the Fake Store API.
 * Prices are converted from USD to INR on arrival.
 * @returns {{ products: Array, categories: Array, loading: boolean, error: string|null }}
 */
const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);
                if (!cancelled) {
                    // Convert USD → INR at source so every consumer sees INR values
                    const inrProducts = productsRes.data.map((p) => ({
                        ...p,
                        price: toINR(p.price),
                    }));
                    setProducts(inrProducts);
                    setCategories(categoriesRes.data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to fetch products. Please try again.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, []);

    return { products, categories, loading, error };
};

export default useProducts;
