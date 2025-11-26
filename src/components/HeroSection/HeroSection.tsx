"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineStock } from "react-icons/ai";
import { CiMobile4 } from "react-icons/ci";
import { FaCheck, FaCloud, FaDatabase, FaFlag, FaFlagUsa, FaHandshake, FaPlug, FaShieldAlt, FaToriiGate } from "react-icons/fa";
import { LuMonitor } from "react-icons/lu";
import { SiChinaeasternairlines } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000, suffix: string = "", startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref, displayValue: `${count}${suffix}` };
};

// import dashboardImg from '../../../public/hero.PNG'
const HeroSection = () => {
  // Animated counters for stats
  const reportsCount = useCountUp(50, 2000, "M+");
  const countriesCount = useCountUp(150, 2000, "+");
  const uptimeCount = useCountUp(99.9, 2000, "%");

  const integrations = [
    {
      id: 'north-america',
      title: 'North America',
      icon: <FaFlagUsa className="text-red-500" />,
      bgColor: 'bg-red-50 border-red-200',
      items: ['Carfax Database', 'AutoCheck Records', 'NMVTIS Data', 'Insurance Claims']
    },
    {
      id: 'japan',
      title: 'Japan',
      icon: <FaToriiGate className="text-blue-500" />,
      bgColor: 'bg-blue-50 border-blue-200',
      items: ['Auction Records', 'Export Documentation', 'Inspection History', 'Registration Data']
    },
    {
      id: 'china',
      title: 'China',
      icon: <SiChinaeasternairlines className="text-yellow-700" />,
      bgColor: 'bg-yellow-50 border-yellow-200',
      items: ['Vehicle Registration', 'Inspection Records', 'Manufacturing Data', 'Export History']
    },
    {
      id: 'europe',
      title: 'Europe',
      icon: <FaFlag className="text-green-500" />,
      bgColor: 'bg-green-50 border-green-200',
      items: ['EuroCarCheck', 'MOT Records', 'Insurance Database', 'Stolen Vehicle DB']
    },
    {
      id: 'global',
      title: 'Global',
      icon:<TbWorld className="text-purple-500" />,
      bgColor: 'bg-purple-50 border-purple-200',
      items: ['Interpol Database', 'Customs Records', 'Import/Export Data', 'Manufacturer Recalls']
    },
    {
      id: 'custom-api',
      title: 'Custom API',
      icon: <FaPlug  className="text-sky-600"/>,
      bgColor: 'bg-cyan-50 border-cyan-200',
      items: ['Local DMV Integration', 'Transport Authority', 'Custom Databases', 'API Development']
    }
  ];

   const features = [
    {
      id: 'hosting',
      icon:<FaCloud  className="text-blue-500"/>,
      title: 'Cloud Hosting',
      description: 'Scalable AWS infrastructure with global CDN',
      color: 'text-blue-600'
    },
    {
      id: 'security',
      icon: <FaShieldAlt className="text-green-500"  />,
      title: 'Security',
      description: 'Enterprise security with SSL encryption',
      color: 'text-green-600'
    },
    {
      id: 'payments',
      icon:<MdOutlinePayment className="text-purple-500" />,
      title: 'Payments',
      description: 'Integrated payment processing',
      color: 'text-purple-600'
    },
    {
      id: 'analytics',
      icon: <VscGraph className="text-orange-400"  />,
      title: 'Analytics',
      description: 'Advanced reporting and insights',
      color: 'text-orange-600'
    }
  ];

   const packages = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      setupFee: null,
      monthly: null,
      period: '',
      description: 'API access with no commitments',
      isPopular: false,
      features: [
        'No setup fees',
        'No monthly subscription',
        'API access only',
        'Pay per API usage'
      ],
      buttonText: 'Get Started'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$500',
      setupFee: '$500',
      monthly: '$150',
      period: 'setup',
      description: 'Branded GlobalVIN solution',
      isPopular: true,
      features: [
        'Branded for GlobalVIN',
        'Web platform & mobile apps',
        'Full database access',
        'Lower API pricing'
      ],
      buttonText: 'Get Started'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$1,750',
      setupFee: '$1,750',
      monthly: '$500',
      period: 'setup',
      description: 'Complete white-label solution',
      isPopular: false,
      features: [
        'White-label branding',
        'Free local API integration',
        'Best API pricing',
        'Dedicated support'
      ],
      buttonText: 'Contact Sales'
    }
  ];
  return (
    <>
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 relative z-10">
          {/* Left Side */}
          <div className="max-w-2xl space-y-6 sm:space-y-8 text-center md:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Trusted by 500+ Businesses Worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Start Your Own{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-transparent bg-clip-text animate-gradient">
                Vehicle History
              </span>{" "}
              Report Business
            </h1>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
              Join the GlobalVIN franchise network and launch a profitable
              vehicle history report business in your country. Complete
              platform, databases, and support included.
            </p>

            {/* Stats with animated counters */}
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center md:justify-start pt-2">
              <div className="text-left" ref={reportsCount.ref}>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">{reportsCount.displayValue}</div>
                <div className="text-sm text-gray-400 mt-1">Reports Generated</div>
              </div>
              <div className="text-left" ref={countriesCount.ref}>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">{countriesCount.displayValue}</div>
                <div className="text-sm text-gray-400 mt-1">Countries Covered</div>
              </div>
              <div className="text-left" ref={uptimeCount.ref}>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">{uptimeCount.displayValue}</div>
                <div className="text-sm text-gray-400 mt-1">Uptime</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Link href="/auth/register" className="group relative w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-center">
                <span className="relative z-10">Start Your Franchise</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
              </Link>
              <Link href="/databases" className="group w-full sm:w-auto border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold hover:scale-105 transform text-center">
                View Demo →
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 justify-center md:justify-start pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-gray-900"></div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-1">4.9/5 from 200+ reviews</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-shrink-0 w-full md:w-[600px] lg:w-[700px] mt-8 md:mt-0 relative">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <Image
                src="/img.png"
                alt="Vehicle dashboard"
                className="relative rounded-2xl shadow-2xl w-full h-auto border border-white/10"
                priority
                width={900}
                height={600}
              />
              {/* Floating badge - bottom left */}
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-100 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">100% Verified</div>
                    <div className="text-sm text-gray-600">Data Sources</div>
                  </div>
                </div>
              </div>
              {/* Floating notification - top right */}
              <div className="absolute -top-6 -right-6 bg-white text-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-100 hidden md:flex items-center gap-3 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg">+15 Reports</div>
                  <div className="text-sm text-gray-600">Generated today</div>
                </div>
              </div>
              {/* Floating notification - middle right */}
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-4 py-2 shadow-2xl hidden lg:flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-sm font-medium">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What is GlobalVIN?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
            GlobalVIN is a comprehensive franchise opportunity that provides
            everything you need to launch and operate a successful vehicle
            history report business in your territory.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-[#f7fbff] to-[#e8f4ff] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex flex-col space-y-4 sm:space-y-5">
                <div className="bg-[#09AFDD] p-3 rounded-lg w-fit mx-auto sm:mx-0">
                  <TbWorld className="text-white" size={24} />
                </div>
                <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[#111827]">
                    Turn-Key Solution
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                    Complete platform with web dashboard, mobile apps, and
                    database integrations ready to deploy in your market.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-[#f7fbff] to-[#e8f4ff] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex flex-col space-y-4 sm:space-y-5">
                <div className="bg-[#09AFDD] p-3 rounded-lg w-fit mx-auto sm:mx-0">
                  <AiOutlineStock className="text-white" size={24} />
                </div>
                <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Proven Business Model
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                    Recurring revenue streams with growing demand for vehicle
                    transparency in emerging markets worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-[#f7fbff] to-[#e8f4ff] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition sm:col-span-2 md:col-span-1">
              <div className="flex flex-col space-y-4 sm:space-y-5">
                <div className="bg-[#09AFDD] p-3 rounded-lg w-fit mx-auto sm:mx-0">
                  <FaHandshake className="text-white" size={24} />
                </div>
                <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Ongoing Support
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                    Comprehensive training, technical support, and business
                    development assistance to ensure your success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#f9fafb]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Complete Platform Included
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
          Everything you need to run a professional vehicle history report business
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 text-left">
          {/* Web Platform */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center bg-[#1e3a8a]/10 w-12 h-12 rounded-lg mx-auto sm:mx-0">
                <LuMonitor className="text-[#1e3a8a]" size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center sm:text-left">Web Platform</h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                Full-featured dashboard with report generation, customer management,
                analytics, and payment processing.
              </p>

              <ul className="mt-2 sm:mt-4 space-y-2 text-xs sm:text-sm text-gray-700">
                {[
                  "Admin Dashboard",
                  "Report Builder",
                  "Customer Portal",
                  "Analytics Suite",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: false, margin: "-50px" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: false }}
                    >
                      <FaCheck size={14} className="text-green-500 flex-shrink-0" />
                    </motion.div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Apps */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center bg-[#1e3a8a]/10 w-12 h-12 rounded-lg mx-auto sm:mx-0">
                <CiMobile4 className="text-[#1e3a8a]" size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center sm:text-left">Mobile Apps</h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                Native iOS and Android applications branded for your market with full
                platform functionality.
              </p>

              <ul className="mt-2 sm:mt-4 space-y-2 text-xs sm:text-sm text-gray-700">
                {[
                  "iOS & Android",
                  "Your Branding",
                  "Offline Capability",
                  "Push Notifications",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: false, margin: "-50px" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: false }}
                    >
                      <FaCheck size={14} className="text-green-500 flex-shrink-0" />
                    </motion.div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Database Access */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition sm:col-span-2 md:col-span-1">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center bg-[#1e3a8a]/10 w-12 h-12 rounded-lg mx-auto sm:mx-0">
                <FaDatabase className="text-[#1e3a8a]" size={24} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center sm:text-left">Database Access</h3>
              <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                Pre-integrated connections to major global databases plus custom API
                integration for local sources.
              </p>

              <ul className="mt-2 sm:mt-4 space-y-2 text-xs sm:text-sm text-gray-700">
                {[
                  "Global Databases",
                  "Local Integration",
                  "Real-time Updates",
                  "API Management",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: false, margin: "-50px" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: false }}
                    >
                      <FaCheck size={14} className="text-green-500 flex-shrink-0" />
                    </motion.div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Database Integrations
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Access to comprehensive vehicle data from trusted sources worldwide
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className={`${integration.bgColor} border rounded-lg p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="text-xl sm:text-2xl">{integration.icon}</span>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {integration.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {integration.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm sm:text-base text-gray-700"
                  >
                    <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Connect your vehicle data sources with our flexible integration platform
          </p>
        </div>
      </div>
    </div>
  <div className="bg-white">
      {/* Website Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Get Your Own Branded Website
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-4">
              Seamless online experiences, instant VIN checks, and trusted vehicle reports — accessible anywhere, anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">

            <div className="flex justify-center">
                <Image src="/monitor.png" alt="Pc" className="w-full h-auto" width={600} height={400} />
            </div>

            {/* Right - Content */}
            <div className="space-y-4 px-4 sm:px-0">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                Our website platform helps franchise owners offer a seamless online experience to their customers. From instant VIN checks to detailed vehicle history reports, everything is designed with clarity and trust in mind. The responsive design ensures users can access reports on any device, while integrated APIs connect local and global data sources for maximum accuracy. It's not just a website — it's a complete digital identity for every Global VIN franchise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Get your own branded Mobile App
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-4">
              Track VIN reports, manage customers, and view analytics from anywhere.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-4 order-2 lg:order-1 flex-1 px-4 sm:px-0">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                Our mobile app empowers every franchise partner to manage their business from anywhere. From scanning vehicle VINs to generating instant reports, everything is just a tap away. Track real-time analytics, monitor customer activity, and sync all your data seamlessly with the main dashboard. Designed for flexibility, it helps you stay connected, informed, and in control—whether you're at the showroom or on the move.
              </p>
            </div>

            {/* Right - Image */}
            <div className="flex justify-center order-1 lg:order-2 flex-1">
              <div className="relative w-full max-w-xs sm:max-w-sm">
          <Image src="/phone.png" alt="Phone" className="w-full h-auto" width={300} height={600} />

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <div className="bg-[#F9FAFB] flex items-center justify-center flex-col py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-10">
            Our Trusted Data Sources
          </h1>
          <Image src="/Oveview picture 1.png" alt="overView" className="w-full max-w-5xl h-auto" width={1200} height={800} />
    </div>


     <div className="bg-white">
      {/* Franchise Process Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Franchise Process
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-4">
              Simple steps to launch your vehicle history report business
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                number: 1,
                title: 'Apply & Setup',
                description: 'Submit franchise application and choose your territory. Receive complete platform setup with your branding.'
              },
              {
                number: 2,
                title: 'Integration & Training',
                description: 'Connect local databases and customize report templates. Complete comprehensive training program.'
              },
              {
                number: 3,
                title: 'Launch & Grow',
                description: 'Go live with your platform and start selling reports. Ongoing support and business development assistance.'
              }
            ].map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center sm:col-span-2 md:col-span-1">
                {/* Number Circle */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-bold">{step.number}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Packages Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Franchise Packages
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-4">
              Choose the package that fits your market and growth plans
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 sm:col-span-2 md:col-span-1 ${
                  pkg.isPopular
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute top-4 sm:top-5 left-0 right-0 bg-[#507FED] w-[80%] mx-auto rounded-2xl py-1.5 sm:py-2 px-3 sm:px-4 text-center">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest">MOST POPULAR</span>
                  </div>
                )}

                {/* Content */}
                <div className={`p-6 sm:p-8 ${pkg.isPopular ? 'pt-14 sm:pt-16' : ''}`}>
                  {/* Package Name */}
                  <h3 className={`text-3xl font-bold mb-2 ${
                    pkg.isPopular ? 'text-white' : 'text-gray-900'
                  }`}>
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p className={`mb-6 text-sm ${
                    pkg.isPopular ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {pkg.setupFee ? (
                      <>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className={`text-4xl font-bold ${
                            pkg.isPopular ? 'text-white' : 'text-gray-900'
                          }`}>
                            {pkg.price}
                          </span>
                          <span className={`text-sm ${
                            pkg.isPopular ? 'text-blue-100' : 'text-gray-600'
                          }`}>
                            <span className="font-semibold">{pkg.period}</span>
                          </span>
                        </div>
                        <div className={`text-sm ${
                          pkg.isPopular ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                          + {pkg.monthly}/month
                        </div>
                      </>
                    ) : (
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className={`text-4xl font-bold ${
                          pkg.isPopular ? 'text-white' : 'text-gray-900'
                        }`}>
                          {pkg.price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            pkg.isPopular ? 'text-blue-200' : 'text-green-500'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className={`text-sm ${
                          pkg.isPopular ? 'text-blue-50' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Link
                    href="/auth/register"
                    className={`block w-full py-3 px-4 rounded-lg font-semibold transition-colors text-center ${
                    pkg.isPopular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                    {pkg.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    <div className="bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">


        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Technology Infrastructure
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-4">
            Enterprise-grade technology stack included with your franchise
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className={`text-4xl mb-4 ${feature.color}`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#4B5563] text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>


    
    <section className="bg-[#33329F] px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
           Ready to Start Your Franchise?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-8 sm:mb-10 px-4">
        Join the GlobalVIN network and launch your vehicle history report business today
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link href="/auth/register" className="bg-[#06B6D4] text-white h-12 px-6 py-3 w-full sm:w-auto sm:min-w-[12rem] rounded-lg font-semibold hover:bg-[#05a5c4] transition flex items-center justify-center">
              Apply for Franchise
            </Link>
            <Link href="/auth/register" className="border-2 border-white text-white h-12 px-6 py-3 w-full sm:w-auto sm:min-w-[12rem] rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>



    </>
  );
};

export default HeroSection;
