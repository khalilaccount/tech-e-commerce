import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Items from "./pages/Items";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected admin routes (each wrapped manually) */}
            <Route
              path="/"
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminLayout>
                  <Products />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/add-product"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AddProduct />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Orders />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/items"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Items />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
