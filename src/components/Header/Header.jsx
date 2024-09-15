import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import SearchField from "./SearchField";
// import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import SubMenu from "./SubMenu";
import { useLocation, useNavigate } from "react-router-dom";
// import { FaRegFloppyDisk, FaRegMessage } from "react-icons/fa6";
import { useHeader } from "../../contexts/HeaderContext";
import HamburgerButton from "./HamburgerButton";
import { useDatabase } from "../../contexts/DatabaseContext";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { selectedProductId, setSelectedProductId } = useDatabase()

    const { isOpen, setIsOpen, menuHandler, offCanvasHandler } = useHeader();
    const [showMegamenu, setShowMegamenu] = useState(true);

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

    //   const { setAuthenticated } = useContext(AuthContext);

    //   const logOut = () => {
    //     localStorage.clear()
    //     setAuthenticated(false)
    //   }

    // Check if the current route is the login page
    const isLoginPage = location.pathname === "/login";

    if (isLoginPage) {
        return null; // Return null to hide the Header
    }

    return (
        <>
            <header className="relative">
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
                                {/* <MenuButton icon={<FaSignOutAlt />} label={true} labelText={"Log Out"} onClick={logOut} /> */}
                            </div>
                        </div>
                        {/* Mobile Header */}
                        <div className="container mx-auto md:hidden">
                            <div className="mb-5 flex justify-between"></div>
                            <div className="flex items-center">
                                <HamburgerButton handler={offCanvasHandler} />
                                <SearchField />
                                <div className="pl-4">
                                    {/* <MenuButton icon={<FaSignOutAlt />} label={false} labelText={"Log Out"} onClick={logOut} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {showMegamenu && <SubMenu openProduct={openProduct} backToHome={toggleMegaMenu} />}
        </>
    );
};

export default Header;
