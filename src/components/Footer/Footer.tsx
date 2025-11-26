import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoCarSharp } from "react-icons/io5";
import { LiaLinkedin } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold"><IoCarSharp /></span>
              </div>
              <span className="font-bold text-white text-lg">GlobalVIN</span>
            </Link>
            <p className="text-sm text-slate-400">
              Empowering vehicle transparency worldwide through franchise partnerships.
            </p>
            <div className="flex gap-4 mt-6">
              <span className="text-slate-400 hover:text-cyan-400 transition cursor-pointer">
                <FaFacebook size={18} />
              </span>
              <span className="text-slate-400 hover:text-cyan-400 transition cursor-pointer">
                <BsTwitter size={18} />
              </span>
              <span className="text-slate-400 hover:text-cyan-400 transition cursor-pointer">
                <LiaLinkedin size={18} />
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-white mb-6">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Web Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/databases" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Database Access
                </Link>
              </li>
              <li>
                <Link href="/databases" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/databases" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Franchise Info
                </Link>
              </li>
              <li>
                <Link href="/dashboard/terms" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/dashboard/terms" className="text-slate-400 hover:text-cyan-400 transition text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Copyright */}
        <div className="pt-8 text-center text-sm text-slate-500">
          © 2025 GlobalVIN. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
