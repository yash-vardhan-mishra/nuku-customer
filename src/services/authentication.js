import { baseUrl } from "../constants";
import { commonErrorHandler } from "../utils";

export const registerUser = async (username, email, password) => {
    try {
        const url = `${baseUrl}/register`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
                user_type: 'customer'
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

export const loginUser = async (identifier, password) => {
    try {
        const url = `${baseUrl}/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier,
                password,
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

export const verifyOtp = async (email, otp) => {
    try {
        const url = `${baseUrl}/verify-otp`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp,
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