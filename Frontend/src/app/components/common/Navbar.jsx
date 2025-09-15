import React, { useState } from "react";
import { Book, Users, Settings, LogOut, Menu, X, Home, BookOpen, Clock, Shield } from "lucide-react";

function Navbar({ user, logout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Book className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            MyLibrary
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1">
          {!user ? (
            // If not logged in
            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="px-6 py-2 text-white/80 hover:text-white transition-colors duration-200 font-medium"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25"
              >
                Sign Up
              </a>
            </div>
          ) : (
            // Logged in navigation
            <div className="flex items-center space-x-1">
              {/* Common Links */}
              <a
                href="/"
                className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </a>

              {user.role === "admin" ? (
                // Admin specific links
                <>
                  <a
                    href="/admin/manage-books"
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Manage Books</span>
                  </a>
                  <a
                    href="/admin/users"
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <Users className="w-4 h-4" />
                    <span>Users</span>
                  </a>
                </>
              ) : (
                // User specific links
                <>
                  <a
                    href="/books"
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Books</span>
                  </a>
                  <a
                    href="/my-borrowed"
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <Clock className="w-4 h-4" />
                    <span>My Books</span>
                  </a>
                </>
              )}

              {/* User Profile Dropdown */}
              <div className="relative ml-4">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-white text-sm font-medium">
                      {user.name || 'User'}
                    </div>
                    <div className="text-white/60 text-xs capitalize flex items-center">
                      {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                      {user.role}
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="text-white font-medium">{user.name || 'User'}</div>
                      <div className="text-white/60 text-sm capitalize flex items-center mt-1">
                        {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                        {user.role}
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 space-y-2">
            {!user ? (
              // Mobile - Not logged in
              <>
                <a
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <span>Login</span>
                </a>
                <a
                  href="/signup"
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg transition-all duration-200 font-semibold"
                >
                  <span>Sign Up</span>
                </a>
              </>
            ) : (
              // Mobile - Logged in
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.name || 'User'}</div>
                    <div className="text-white/60 text-sm capitalize flex items-center">
                      {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                      {user.role}
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <a
                  href="/"
                  className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </a>

                {user.role === "admin" ? (
                  <>
                    <a
                      href="/admin/manage-books"
                      className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Manage Books</span>
                    </a>
                    <a
                      href="/admin/users"
                      className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      <Users className="w-5 h-5" />
                      <span>Users</span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/books"
                      className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>Books</span>
                    </a>
                    <a
                      href="/my-borrowed"
                      className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      <Clock className="w-5 h-5" />
                      <span>My Borrowed Books</span>
                    </a>
                  </>
                )}

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 mt-4 border-t border-white/10 pt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;