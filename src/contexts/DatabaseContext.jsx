import { useState, createContext, useContext, useEffect } from "react";
import { fetchProducts } from "../services/products";
import Loading from "../components/Utilities/Loading";
import { toast } from 'react-toastify';

const DatabaseContext = createContext();

export const useDatabase = () => {
    return useContext(DatabaseContext);
};

export const DatabaseProvider = ({ children }) => {
    const [data, setData] = useState();
    const [selectedProductId, setSelectedProductId] = useState(null)

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true)
        fetchProducts().then(res => {
            setData(res)
        }).catch(err => {
            showError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    };
    const showError = (error) => {
        const errorMessage = error || 'Something went wrong';
        const colonIndex = errorMessage.indexOf(':');
        const finalMessage = colonIndex !== -1 ? errorMessage.slice(colonIndex + 1).trim() : errorMessage;
        toast.error(finalMessage);
    };

    useEffect(() => {
        fetchData()
    }, [])



    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <DatabaseContext.Provider
            value={{ data, selectedProductId, setSelectedProductId }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};
