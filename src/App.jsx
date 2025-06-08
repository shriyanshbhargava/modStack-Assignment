import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isAuthenticated, isLoading } = useAuthContext();

  const routes = useRoutes([
    {
      path: "/",
      element: !isAuthenticated ? (
        <LandingPage />
      ) : (
        <Navigate to="/dashboard" replace />
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: isAuthenticated ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Navigate to="/" replace />
      ),
    },
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return routes;
}

export default App;
