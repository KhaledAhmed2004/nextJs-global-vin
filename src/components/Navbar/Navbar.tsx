"use client";

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
    <nav className="bg-[#F4F5FA] px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex-shrink-0">
         <Link href='/'>
          <div className="flex items-center gap-2">
            <span className="bg-[#1E3A8A] p-1.5 rounded-lg text-white ">
              <IoCarSharp size={18} className="" />
            </span>
            <p className="text-xl sm:text-2xl font-bold">GlobalVIN</p>
          </div>
         </Link>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-12">
          <Link
            href="/"
            className="text-gray-500 text-sm font-medium hover:opacity-80 transition-opacity duration-200 py-2 min-h-[44px] flex items-center"
          >
            Home
          </Link>
          <Link
            href="/databases"
            className="text-gray-500 text-sm font-medium hover:opacity-80 transition-opacity duration-200 py-2 min-h-[44px] flex items-center"
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
              className="text-gray-500 text-sm font-medium hover:opacity-80 transition-opacity duration-200 flex items-center gap-1 py-2 min-h-[44px]"
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
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors min-h-[44px]"
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
            className="text-gray-500 text-sm font-medium hover:opacity-80 transition-opacity duration-200 py-2 min-h-[44px] flex items-center"
          >
            Technology
          </Link>
          <Link
            href="/auth/register"
            className="text-white rounded-lg bg-[#F97316] h-11 px-4 lg:px-6 min-w-[120px] lg:min-w-[144px] py-1 flex items-center justify-center text-sm font-medium hover:opacity-80 transition-opacity duration-200"
          >
            Try for Free
          </Link>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          className="lg:hidden text-blue-900 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
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
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-6 pt-2 border-t border-[#1E3A8A]">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-1 px-4">
            <Link
              href="/"
              className="text-white text-base font-medium hover:opacity-80 transition-opacity duration-200 py-3 min-h-[44px] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/databases"
              className="text-white text-base font-medium hover:opacity-80 transition-opacity duration-200 py-3 min-h-[44px] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Databases
            </Link>
            {/* Mobile APIs Accordion */}
            <div>
              <button
                onClick={() => setIsMobileApisOpen(!isMobileApisOpen)}
                className="text-white text-base font-medium hover:opacity-80 transition-opacity duration-200 py-3 min-h-[44px] flex items-center gap-2 w-full"
              >
                APIs
                <HiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMobileApisOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isMobileApisOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  {apiLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/80 text-sm font-medium hover:text-white transition-colors py-3 min-h-[44px] flex items-center"
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
              className="text-white text-base font-medium hover:opacity-80 transition-opacity duration-200 py-3 min-h-[44px] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Technology
            </Link>
            <Link
              href="/auth/register"
              className="text-white rounded-lg bg-[#F97316] h-11 w-full sm:w-36 px-4 py-2 flex items-center justify-center text-sm font-medium hover:opacity-80 transition-opacity duration-200 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Try for Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
