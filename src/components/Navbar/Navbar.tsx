"use client";

// import logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { IoCarSharp } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isApisDropdownOpen, setIsApisDropdownOpen] = useState(false);
  const [isMobileApisOpen, setIsMobileApisOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsApisDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const apiLinks = [
    { href: "/carfax", label: "Carfax API" },
    { href: "/autocheck", label: "AutoCheck API" },
    { href: "/chinese-api", label: "China Vehicle API" },
  ];

  return (
    <nav className="bg-[#F4F5FA] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex-shrink-0">
         <Link href='/'>
          <div className="flex items-center gap-2">
            <span className="bg-[#1E3A8A] p-1.5 rounded-lg text-white ">
              <IoCarSharp size={18} className="" />
            </span>
            <p className="text-2xl font-bold">GlobalVIN</p>
          </div>
         </Link>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          <Link
            href="/"
            className="text-gray-500 text-sm font-medium hover:opacity-80 transition-opacity duration-200"
          >
            Home
          </Link>
          <Link
            href="/databases"
            className="text-gray-500 text-sm font-medium hover:opacity-80 transition-opacity duration-200"
          >
            Databases
          </Link>
          {/* APIs Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setIsApisDropdownOpen(!isApisDropdownOpen)}
              className="text-gray-500 text-sm font-medium hover:opacity-80 transition-opacity duration-200 flex items-center gap-1"
            >
              APIs
              <HiChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isApisDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isApisDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {apiLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsApisDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/technology"
            className="text-gray-500 text-sm font-medium hover:opacity-80 transition-opacity duration-200"
          >
            Technology
          </Link>
          <Link
            href="/auth/register"
            className="text-white rounded-lg bg-[#F97316] h-10 w-36 px-2 py-1 flex items-center justify-center text-sm font-medium hover:opacity-80 transition-opacity duration-200"
          >
            Try for Free
          </Link>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          className="lg:hidden text-blue-900  p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Slides down when open */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-[#1E3A8A] ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className=" pb-6 pt-2 border-t border-[#1E3A8A]">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4 px-4 ">
            <Link
              href="/"
              className="text-white text-base font-medium hover:opacity-80 transition-opacity duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/databases"
              className="text-white text-base font-medium hover:opacity-80 transition-opacity duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Databases
            </Link>
            {/* Mobile APIs Accordion */}
            <div>
              <button
                onClick={() => setIsMobileApisOpen(!isMobileApisOpen)}
                className="text-white text-base font-medium hover:opacity-80 transition-opacity duration-200 py-2 flex items-center gap-2 w-full"
              >
                APIs
                <HiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMobileApisOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isMobileApisOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {apiLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/80 text-sm font-medium hover:text-white transition-colors py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/technology"
              className="text-white text-base font-medium hover:opacity-80 transition-opacity duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Technology
            </Link>
            <Link
              href="/auth/register"
              className="text-white rounded-lg bg-[#F97316] h-10 w-36 px-2 py-1 flex items-center justify-center text-sm font-medium hover:opacity-80 transition-opacity duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Try for Free
            </Link>
          </div>

          {/* Mobile Social Icons */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
