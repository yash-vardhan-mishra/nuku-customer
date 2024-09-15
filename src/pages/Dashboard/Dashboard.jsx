// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;