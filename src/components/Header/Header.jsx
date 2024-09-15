import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import SearchField from "./SearchField";
import { useContext, useEffect, useState } from "react";
import SubMenu from "./SubMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../contexts/HeaderContext";
import HamburgerButton from "./HamburgerButton";
import { useDatabase } from "../../contexts/DatabaseContext";
import MainMenu from "./MainMenu";
import { AuthContext } from "../../contexts/AuthContext";
import OffCanvas from "./OffCanvas";
import { useCart } from "../../contexts/CartContext";
import SlideInCart from "../SlideInCart/SlideInCart";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authenticated, logout } = useContext(AuthContext)
    const { itemsInCart, calculateQuantity, slideInCart, setSlideInCart } =
        useCart();

    const TotalQuantity = calculateQuantity(itemsInCart);

    const { selectedProductId, setSelectedProductId } = useDatabase()

    const { isOpen, setIsOpen, menuHandler, offCanvasHandler } = useHeader();
    const [showMegamenu, setShowMegamenu] = useState(true);

    const signInAction = () => {
        if (authenticated) {
            logout()
        } else {
            navigate(`/login`);
        }
    }

    const Navigation = [
        {
            id: 1,
            menu: authenticated ? "Log Out" : "Sign In",
            icon: authenticated ? <FaSignOutAlt /> : <FaRegUser />,
            action: signInAction

        },
    ];

    useEffect(() => {
        if (!isOpen) {
            const timeout = setTimeout(() => {
                setShowMegamenu(false);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            setShowMegamenu(true);
        }
    }, [isOpen]);

    const openProduct = (id) => {
        if (id !== selectedProductId) {
            setSelectedProductId(id);
            navigate(`/product/${id}`, { replace: true });
        }
        toggleMegaMenu();
    };

    const toggleMegaMenu = () => {
        setShowMegamenu((showMegamenu) => !showMegamenu);
        setIsOpen((isOpen) => !isOpen);
    }

    // hide the header in case of login screen
    const isLoginPage = location.pathname === "/login";
    if (isLoginPage) {
        return null;
    }

    return (
        <>
            <header className="relative">
                <SlideInCart
                    className={slideInCart ? "translate-x-0" : ""}
                    setSlideInCart={setSlideInCart}
                    slideInCart={slideInCart}
                />
                <div className="bg-primary px-4 py-3 xl:py-4 2xl:px-16">
                    <div className="container mx-auto">
                        {/* Desktop Header */}
                        <div className="hidden flex-col items-center justify-between gap-6 md:flex lg:flex-row">
                            <div className="flex w-full justify-between lg:w-auto lg:justify-normal">
                                <HamburgerButton desktop={true} handler={menuHandler} />
                            </div>
                            <div className="flex w-full flex-grow items-center lg:w-auto">
                                <div className="flex w-full items-center gap-10 pl-0 pr-0 lg:pl-6 lg:pr-6 ">
                                    <SearchField />
                                </div>
                            </div>
                            <div className="lg:pr-0 xl:pl-14 xl:pr-6 2xl:pr-4">
                                <MainMenu
                                    MenuArray={Navigation}
                                    label={true}
                                    slideInCart={slideInCart}
                                    setSlideInCart={setSlideInCart}
                                    TotalQuantity={TotalQuantity}
                                />
                            </div>
                        </div>
                        {/* Mobile Header */}
                        <div className="container mx-auto md:hidden">
                            <div className="mb-5 flex justify-between"></div>
                            <div className="flex items-center">
                                <HamburgerButton handler={offCanvasHandler} />
                                <SearchField />
                                <div className="pl-4">
                                    <MainMenu
                                        MenuArray={Navigation}
                                        label={false}
                                        slideInCart={slideInCart}
                                        setSlideInCart={setSlideInCart}
                                        TotalQuantity={TotalQuantity}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {showMegamenu && <SubMenu openProduct={openProduct} backToHome={toggleMegaMenu} />}
            <OffCanvas />
        </>
    );
};

export default Header;
