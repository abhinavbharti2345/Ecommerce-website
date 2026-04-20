import { useState, useEffect } from 'react';

/**
 * Delays updating a value until the user stops changing it for `delay` ms.
 * @param {*} value
 * @param {number} delay  in ms (default 300)
 * @returns {*} debounced value
 */
const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
