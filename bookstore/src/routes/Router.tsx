import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { AuthRoute } from "./authRouts";
import { ProtectedRoute } from "./protectedRoute";
import SinglePageBook from "../pages/SinglePageBook";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Order from "../pages/Order";
import Wishlist from "../pages/Wishlist";
import OrderPage from "../pages/OrderPage";
const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="book/:id" element={<SinglePageBook />} />
            <Route
              path="cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/order" element={<Order />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/allorder" element={<OrderPage />} />
          </Route>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
