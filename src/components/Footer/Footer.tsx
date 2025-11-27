import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoCarSharp } from "react-icons/io5";
import { LiaLinkedin } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold"><IoCarSharp /></span>
              </div>
              <span className="font-bold text-white text-lg">GlobalVIN</span>
            </Link>
            <p className="text-sm text-slate-400">
              Empowering vehicle transparency worldwide through franchise partnerships.
            </p>
            <div className="flex gap-2 mt-6">
              <span className="text-slate-400 hover:text-cyan-400 transition cursor-pointer p-2 -m-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <FaFacebook size={20} />
              </span>
              <span className="text-slate-400 hover:text-cyan-400 transition cursor-pointer p-2 -m-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <BsTwitter size={20} />
              </span>
              <span className="text-slate-400 hover:text-cyan-400 transition cursor-pointer p-2 -m-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <LiaLinkedin size={22} />
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-white mb-4 sm:mb-6">Platform</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Web Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/databases" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Database Access
                </Link>
              </li>
              <li>
                <Link href="/databases" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4 sm:mb-6">Support</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/databases" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Franchise Info
                </Link>
              </li>
              <li>
                <Link href="/dashboard/terms" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/dashboard/terms" className="text-slate-400 hover:text-cyan-400 transition text-sm py-2 block min-h-[44px] flex items-center">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 text-center text-sm text-slate-500">
          © 2025 GlobalVIN. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
