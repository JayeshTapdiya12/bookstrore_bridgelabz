import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { AuthRoute } from "./authRouts";
import { ProtectedRoute } from "./protectedRoute";
import SinglePageBook from "../pages/SinglePageBook";
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
          />

          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <SinglePageBook />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="book/:id" element={<SinglePageBook />} />
          </Route> */}
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
