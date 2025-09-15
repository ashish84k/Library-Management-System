import React, { useState, useEffect } from "react";
import { Book, Users, Shield, Star, Quote, ChevronDown, Play, BookOpen, UserCheck, Clock, TrendingUp, CheckCircle, Calendar, Search, Plus, RotateCcw } from "lucide-react";
import { useUser } from "../../service/UserContext";


export default function Home() {
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { text: "The role-based system makes managing our library so efficient. Perfect for both admins and users!", author: "Sarah Johnson, Librarian", rating: 5 },
    { text: "Borrowing and returning books has never been easier. The availability tracking is spot-on!", author: "Mike Chen, Student", rating: 5 },
    { text: "As an admin, I love how simple it is to add new books and track borrowing patterns.", author: "Dr. Emma Wilson, Library Director", rating: 5 }
  ];

  const stats = [
    { number: "2", label: "User Roles", icon: Users, desc: "Admin & User" },
    { number: "Real-time", label: "Book Tracking", icon: Clock, desc: "Availability Status" },
    { number: "Secure", label: "Authentication", icon: Shield, desc: "Login System" },
    { number: "Mobile", label: "Responsive", icon: TrendingUp, desc: "All Devices" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Role-Based Access Control",
      description: "Secure authentication system with Admin and User roles. Each role has specific permissions and functionalities.",
      features: ["User Registration & Login", "Admin Dashboard Access", "Role-based Navigation", "Secure Cookie Management"]
    },
    {
      icon: BookOpen,
      title: "Complete Book Management",
      description: "Comprehensive book catalog with CRUD operations for admins and browsing capabilities for users.",
      features: ["Add/Update/Delete Books", "Book Details (Title, Author, Genre)", "Copy Management"]
    },
    {
      icon: RotateCcw,
      title: "Smart Borrowing System",
      description: "Intelligent book borrowing and returning system with availability tracking and user history.",
      features: ["Borrow Available Books", "Return Borrowed Books", "Borrowing History", "Availability Status"]
    }
  ];

  const adminFeatures = [
    { icon: Plus, title: "Add New Books", desc: "Add books with title, author, genre & copies" },
    { icon: Book, title: "Manage Inventory", desc: "Update or delete existing book records" },
    { icon: Users, title: "Track Borrowing", desc: "Monitor borrowed books & user activity" }
  ];

  const userFeatures = [
    { icon: BookOpen, title: "Borrow Books", desc: "Borrow available books instantly" },
    { icon: Calendar, title: "My Borrowed Books", desc: "View personal borrowing history" },
    { icon: RotateCcw, title: "Return Books", desc: "Return borrowed books easily" }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0">
          <Book className="absolute top-32 left-20 text-white/10 w-12 h-12 animate-bounce" />
          <Users className="absolute top-48 right-32 text-white/10 w-8 h-8 animate-bounce delay-1000" />
          <Shield className="absolute bottom-40 left-32 text-white/10 w-10 h-10 animate-bounce delay-2000" />
        </div>

        <div className={`relative z-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium text-white/90 mb-8">
              <BookOpen className="w-4 h-4 mr-2" />
              Complete Library Management System
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Book Library
            </span>
            <span className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
              Management System
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-4xl leading-relaxed">
            A comprehensive web application for managing personal book collections with role-based access control.
            <span className="block mt-2 font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Perfect for libraries, schools, and book enthusiasts!
            </span>
          </p>
          
          { !user && <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="/signup"
              className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              <UserCheck className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Register Now
            </a>
            <a
              href="/login"
              className="px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              Already have an account? Login
            </a>
          </div>}

          <div className="animate-bounce">
            <ChevronDown className="text-white/50 w-8 h-8 mx-auto" />
          </div>
        </div>
      </section>

      {/* Key Features Stats */}
      <section className="py-16 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            System Capabilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group transform hover:scale-105 transition-all duration-300">
                <div className="mb-4 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-white/10 group-hover:border-white/20">
                  <stat.icon className="w-8 h-8 mx-auto text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-white/60 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Core Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Everything you need for a complete library management experience
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                <div className="relative p-8 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-white/60">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Features */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Role-Based Access
            </h2>
            <p className="text-xl text-white/70">
              Different features for Admins and Users
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Admin Features */}
            <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-red-400 mr-3" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h3>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Complete control over the library system with advanced management capabilities.
              </p>
              <div className="space-y-4">
                {adminFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <feature.icon className="w-6 h-6 text-red-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-white/60 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Features */}
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  User Interface
                </h3>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Simple and intuitive interface for browsing and borrowing books.
              </p>
              <div className="space-y-4">
                {userFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-white/60 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Technical Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Security & Authentication</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Secure user registration and login</li>
                <li>• Role-based access control</li>
                <li>• Cookie management</li>
                <li>• Input validation & sanitization</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Database & API</h3>
              <ul className="space-y-2 text-white/70">
                <li>• RESTful API endpoints</li>
                <li>• None Relational database design</li>
                <li>• Real-time availability</li>
                <li>• Data integrity & constraints</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-green-400">User Experience</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Responsive mobile-friendly design</li>
                <li>• Intuitive user interface</li> 
                <li>• Error handling & feedback</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Smart Logic</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Prevent duplicate borrowing</li>
                <li>• Automatic availability calculation</li>
                <li>• Borrowing history tracking</li>
                <li>• Copy management system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What Users Say
            </h2>
            <p className="text-white/70 text-lg">
              Trusted by librarians and book lovers
            </p>
          </div>
          
          <div className="relative h-64">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentTestimonial
                    ? 'opacity-100 transform translate-x-0'
                    : 'opacity-0 transform translate-x-full'
                }`}
              >
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center h-full flex flex-col justify-center">
                  <Quote className="text-purple-400 w-8 h-8 mb-6 mx-auto" />
                  <p className="text-xl md:text-2xl text-white/90 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 w-5 h-5 mx-1 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 font-semibold">— {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-purple-500 w-10 shadow-lg shadow-purple-500/50' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
            Start Managing Your
            <span className="block bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Library Today
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the modern way of library management with role-based access and intelligent book tracking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center px-10 py-4 bg-white text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Get Started Free
              <ChevronDown className="ml-3 w-5 h-5 rotate-[-90deg]" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center px-10 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              I have an account
            </a>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Book Library System
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              A comprehensive library management solution with role-based access control, 
              real-time availability tracking, and intuitive user experience.
            </p>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/60">
              © 2025 Book Library Management System. Built for efficient library operations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}