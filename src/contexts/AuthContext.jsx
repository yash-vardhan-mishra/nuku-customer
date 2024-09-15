// src/contexts/AuthContext.jsx
import React, { createContext, useState } from "react";
import { loginUser, registerUser, verifyOtp } from "../services/authentication";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const login = async (email, password) => {
        try {
            await loginUser(email, password);
            setOtpSent(true);  // OTP is sent after registration
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            await registerUser(username, email, password);
            setOtpSent(true);  // OTP is sent after registration
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const verify = async (email, otp) => {
        try {
            const response = await verifyOtp(email, otp);
            setAuthenticated(true);  // Set authenticated to true upon successful OTP verification
            setOtpSent(false);
        } catch (error) {
            console.error("OTP verification failed:", error);
            throw error;
        }
    };

    const logout = () => {
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, register, verify, otpSent, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
