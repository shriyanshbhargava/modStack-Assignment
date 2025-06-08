import React from "react";
import { BookOpen, Zap, Shield } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { loginWithPopup } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithPopup();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://i.ibb.co/Hf3X7ZkY/df-removebg-preview.png"
              alt="ModStack Notes"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ModStack Notes
            </span>
          </div>

          <nav className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="https://shriyansh.vercel.app/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </div>
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Login / Sign Up
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Note Taking
            </span>{" "}
            Experience
            <br />
            <span className="text-gray-900">Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI powered. Fast. Organized. Capture your ideas, organize your
            thoughts, and never lose track of what matters most.
          </p>
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            Get Started
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
            <p className="text-gray-600">
              Create and access your notes instantly with our optimized
              interface designed for speed.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Organization</h3>
            <p className="text-gray-600">
              Automatically organize your notes with intelligent categorization
              and powerful search.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
            <p className="text-gray-600">
              Your notes are encrypted and stored securely. Your privacy is our
              top priority.
            </p>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div className="p-8">
            <h4 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Clean, Intuitive Interface
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-800 mb-2">
                  📝 Meeting Notes
                </h5>
                <p className="text-sm text-gray-600">
                  Discussed project timeline and deliverables...
                </p>
                <div className="text-xs text-gray-400 mt-2">2 hours ago</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-800 mb-2">💡 Ideas</h5>
                <p className="text-sm text-gray-600">
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
