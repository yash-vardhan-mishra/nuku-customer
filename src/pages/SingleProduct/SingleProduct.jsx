import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import Layout from "../../Layout";
import Loading from "../../components/Utilities/Loading";
import { fetchSingleProduct } from "../../services/products";
import { AuthContext } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { toast } from 'react-toastify';

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const [singleProduct, setSingleProduct] = useState();
    const [loading, setLoading] = useState(true);
    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const { addToCartHandler, itemsInCart } = useCart();

    const { id } = useParams();

    useEffect(() => {
        if (itemsInCart?.length) {
            const valueForThisItem = itemsInCart.filter(itm => itm.id === id);
            if (valueForThisItem?.length && valueForThisItem[0].quantity) {
                setQuantity(parseInt(valueForThisItem[0].quantity, 10));
            } else {
                setQuantity(1);
            }
        }
        if (!loading) {
            setLoading(true);
        }
        const getSingleProduct = async (id) => {
            fetchSingleProduct(id)
                .then(res => {
                    setSingleProduct(res);
                })
                .catch(err => {
                    showError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        getSingleProduct(id);
    }, [id]);
    const showError = (error) => {
        const errorMessage = error || 'Something went wrong';
        const colonIndex = errorMessage.indexOf(':');
        const finalMessage = colonIndex !== -1 ? errorMessage.slice(colonIndex + 1).trim() : errorMessage;
        toast.error(finalMessage);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const incrementQuantity = () => {
        if (quantity < singleProduct.stock_quantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const addItemsToCart = () => {
        if (!authenticated) {
            navigate("/login", { state: { from: `/product/${id}` } });
        } else {
            addToCartHandler(id, quantity);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (singleProduct?.image_url) {
        const { title, image_url, description, category, price, stock_quantity } = singleProduct;

        return (
            <Layout>
                <div className="container mx-auto py-8">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="-mx-4 flex flex-col md:flex-row">
                            <div className="px-4 md:flex-1">
                                <div className="mb-4 rounded-lg bg-gray-100 p-10">
                                    <img
                                        className="mx-auto h-full w-10/12 object-cover mix-blend-multiply"
                                        src={image_url}
                                        alt={title}
                                    />
                                </div>
                            </div>
                            <div className="p-10 px-4 md:flex-1">
                                <p className="mb-4 text-sm font-bold uppercase text-blue-400">
                                    {category}
                                </p>
                                <h2 className="mb-3 text-4xl font-bold leading-9 text-gray-800">
                                    {title}
                                </h2>
                                <p className="my-3 border-b border-t py-4 text-3xl leading-10">
                                    ${price}
                                </p>
                                <p className="my-6 text-gray-600">{description}</p>

                                <div className="mb-4 flex flex-col gap-6">
                                    <form className="flex items-center gap-10">
                                        <p className="mb-2 block font-medium text-gray-900">
                                            Quantity:
                                        </p>
                                        <div className="relative flex max-w-[8rem] items-center">
                                            <button
                                                type="button"
                                                id="decrement-button"
                                                className="h-12 rounded-s border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none"
                                                onClick={decrementQuantity}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                id="quantity-input"
                                                className="block h-12 w-full border-x-0 border-y border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900"
                                                value={quantity}
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                id="increment-button"
                                                className="h-12 rounded-e border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none"
                                                onClick={incrementQuantity}
                                                disabled={quantity >= stock_quantity}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </form>

                                    <button
                                        className="flex items-center justify-center gap-3 rounded bg-sky-500 px-8 py-3 text-white transition duration-300 hover:bg-sky-600"
                                        onClick={addItemsToCart}
                                    >
                                        <BsCart2 />
                                        <span>Add to bag</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
};

export default SingleProduct;
