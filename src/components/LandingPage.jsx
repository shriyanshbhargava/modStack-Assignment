import React from "react";
import { BookOpen, Zap, Shield, Menu, X } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LandingPage = () => {
  const { loginWithPopup } = useAuthContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await loginWithPopup();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src="https://i.ibb.co/Hf3X7ZkY/df-removebg-preview.png"
              alt="ModStack Notes"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ModStack Notes
            </span>
          </div>

          <nav className="flex items-center">
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 mr-6">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm xl:text-base"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm xl:text-base"
              >
                Features
              </a>
              <a
                href="https://shriyansh.vercel.app/"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm xl:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </div>
            
            <button
              onClick={handleLogin}
              className="hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm lg:text-base"
            >
              Login / Sign Up
            </button>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden ml-4 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Home
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Features
              </a>
              <a
                href="https://shriyansh.vercel.app/"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg text-sm mt-2"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Note Taking
            </span>{" "}
            Experience
            <br className="hidden sm:block" />
            <span className="text-gray-900">Simplified</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            AI powered. Fast. Organized. Capture your ideas, organize your
            thoughts, and never lose track of what matters most.
          </p>
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            Get Started
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Lightning Fast</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Create and access your notes instantly with our optimized
              interface designed for speed.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Smart Organization</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Automatically organize your notes with intelligent categorization
              and powerful search.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Secure & Private</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Your notes are encrypted and stored securely. Your privacy is our
              top priority.
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
              Clean, Intuitive Interface
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                  📝 Meeting Notes
                </h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Discussed project timeline and deliverables...
                </p>
                <div className="text-xs text-gray-400 mt-2">2 hours ago</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">💡 Ideas</h5>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  New feature concepts for the mobile app...
                </p>
                <div className="text-xs text-gray-400 mt-2">Yesterday</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;