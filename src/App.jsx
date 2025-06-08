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
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="text-center max-w-sm w-full">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-2 sm:border-3 lg:border-4 border-gray-200 border-t-blue-600 mx-auto mb-3 sm:mb-4"></div>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">
            Loading...
          </p>

          <div className="mt-4 w-full bg-gray-200 rounded-full h-1 sm:h-1.5 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen w-full">{routes}</div>;
}

export default App;
