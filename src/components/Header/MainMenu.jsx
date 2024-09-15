import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

const MainMenu = ({
    MenuArray,
    label,
    slideInCart,
    setSlideInCart,
    TotalQuantity,
}) => {
    return (
        <ul className="flex gap-x-5 text-white">
            {MenuArray.map((item) => (
                <li key={item.id}>
                    <a
                        onClick={item?.action ? item.action : null}
                        className="flex flex-col items-center gap-1 cursor-pointer hover:text-yellow-500"
                    >
                        {item.icon}
                        {label && <span className="text-sm">{item.menu}</span>}
                    </a>
                </li>
            ))}
            <li>
                <button
                    onClick={() => {
                        setSlideInCart(!slideInCart);
                    }}
                    className="relative flex flex-col items-center gap-1"
                >
                    <MdOutlineShoppingCart />
                    {label && <span className="text-sm">cart</span>}
                    <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-800 text-[8px] md:h-[15px] md:w-[15px] md:bottom-8 md:left-3">
                        {TotalQuantity}
                    </div>
                </button>
            </li>
        </ul>
    );
};

export default MainMenu;
