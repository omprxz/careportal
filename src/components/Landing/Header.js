"use client"

import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Care Portal
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Login / Sign Up
          </Link>
        </nav>
        <button className="md:hidden text-gray-600" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-center"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
