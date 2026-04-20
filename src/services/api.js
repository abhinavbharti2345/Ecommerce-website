import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get('/products/categories');
export const getProductsByCategory = (cat) => api.get(`/products/category/${cat}`);
