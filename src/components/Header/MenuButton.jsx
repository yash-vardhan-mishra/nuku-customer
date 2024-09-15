import React from "react";

const MenuButton = ({
    label,
    icon,
    labelText,
    onClick
}) => {
    return (
        <ul className="flex gap-x-5 text-white hover:text-gray-300 hover:cursor-pointer select-none">
            <a onClick={onClick} className="flex flex-col items-center gap-1">
                {icon}
                {label && <span className="text-sm">{labelText}</span>}
            </a>
        </ul>
    );
};

export default MenuButton;
