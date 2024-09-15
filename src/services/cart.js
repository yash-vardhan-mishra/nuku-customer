import { baseUrl } from "../constants";
import { commonErrorHandler } from "../utils";

export const getCart = async () => {
    try {
        const token = localStorage.getItem('token');
        const url = `${baseUrl}/cart`;
        console.log('fetch req', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const addToCart = async (productId, quantity) => {
    try {
        const token = localStorage.getItem('token');
        const url = `${baseUrl}/cart/add`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity,
            }),
        });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const removeItemFromCart = async (productId, quantity) => {
    try {
        const token = localStorage.getItem('token');
        const url = `${baseUrl}/cart/delete`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity,
            }),
        });

        if (!response.ok) {
            const err = await commonErrorHandler(response)
            throw err
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};