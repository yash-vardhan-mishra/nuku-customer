import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Profile from "./pages/Profile/Profile";
// import Settings from "./pages/Settings/Settings";
// import Reports from "./pages/Reports/Reports";
import { useContext } from "react";
import { HeaderProvider } from "./contexts/HeaderContext";
import { DatabaseProvider } from "./contexts/DatabaseContext";
import SingleProduct from "./pages/SingleProduct/SingleProduct";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DatabaseProvider>
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
        </DatabaseProvider>
      </AuthProvider>
    </Router>
  );
}

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? children : <Navigate to="/home" replace />;
};

export default App;
