import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { checkForErrorType, formatToNzd } from "../utils";
import { addToCart, getCart, removeItemFromCart } from "../services/cart";
import { useDatabase } from "./DatabaseContext";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const { authenticated, logout } = useContext(AuthContext);
    const { data } = useDatabase()
    const [itemsInCart, setItemsInCart] = useState([]);
    const [slideInCart, setSlideInCart] = useState(false);
    const navigate = useNavigate();

    const fetchCart = () => {
        getCart().then(cartData => {
            if (Array.isArray(cartData) && cartData?.length && Array.isArray(data) && data?.length) {
                const modifiedCartData = cartData.map(item => {
                    const cartItem = data.filter(itm => itm.id === item.product_id)[0]
                    return { ...cartItem, ...item }
                })
                setItemsInCart(modifiedCartData);
            }
        }).catch(err => {
            const shouldDeleteToken = checkForErrorType(err);
            if (shouldDeleteToken) {
                logout()
                navigate(`/home`);
            }
        })
    }

    useEffect(() => {
        if (!authenticated) {
            setItemsInCart([])
        }
    }, [authenticated])

    useEffect(() => {
        fetchCart()
    }, [])

    const addToCartHandler = async (
        id,
        quantity = 1,
    ) => {
        try {
            const data = await addToCart(id, quantity);
            fetchCart()
            alert('Product added to cart successfully!');
        } catch (error) {
            alert(error.message);
        }
        setSlideInCart(true);
    };

    const removeItemHandler = async (
        productId,
        quantity,
    ) => {
        try {
            const data = await removeItemFromCart(productId, quantity);
            fetchCart()
            alert('Product deleted from cart successfully!');
        } catch (error) {
            alert(error.message);
        }
        setSlideInCart(true);
    };

    const getOverlay = document.getElementById("body-overlay");

    useEffect(() => {
        if (slideInCart) {
            getOverlay.classList.add("cart-offcanvas-open");
        } else {
            getOverlay.classList.remove("cart-offcanvas-open");
        }

        return () => {
            getOverlay.classList.remove("cart-offcanvas-open");
        };
    }, [slideInCart]);

    const calculateTotal = (items) => {
        let total = 0;

        items.forEach((item) => {
            total += item.quantity * item.price;
        });
        return formatToNzd(total)
    };

    const calculateQuantity = (items) => {
        return items?.length || 0;
    };

    return (
        <CartContext.Provider
            value={{
                itemsInCart,
                addToCartHandler,
                calculateTotal,
                calculateQuantity,
                slideInCart,
                setSlideInCart,
                removeItemHandler
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
