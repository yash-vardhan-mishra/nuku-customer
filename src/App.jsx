import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useContext } from "react";
import { HeaderProvider } from "./contexts/HeaderContext";
import { DatabaseProvider } from "./contexts/DatabaseContext";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import { CartProvider } from "./contexts/CartContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
        <DatabaseProvider>
          <CartProvider>
            <HeaderProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Authentication />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/product/:id" element={<SingleProduct />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Redirect to home for undefined routes */}
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </HeaderProvider>
          </CartProvider>
        </DatabaseProvider>
      </AuthProvider>
    </Router>
    <ToastContainer />
    </>
  );
}

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default App;
