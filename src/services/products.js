import { baseUrl } from "../constants";
import { commonErrorHandler } from "../utils";

export const fetchProducts = async () => {
    try {
        const url = `${baseUrl}/products`;

        const response = await fetch(url, { method: 'GET', headers: { "Content-Type": "application/json" } });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const database = await response.json();
        return database
    } catch (error) {
        throw error
    }
}

export const fetchSingleProduct = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/products/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const database = await response.json();
        return database
    } catch (error) {
        throw error
    }
}

export const searchProducts = async (searchString) => {
    try {
        const url = `${baseUrl}/products/search?searchString=${encodeURIComponent(searchString)}`;

        const response = await fetch(url, { method: 'GET', headers: { "Content-Type": "application/json" } });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const database = await response.json();
        return database
    } catch (error) {
        throw error
    }
}