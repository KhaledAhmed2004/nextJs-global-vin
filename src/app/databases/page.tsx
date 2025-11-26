"use client";

import { BiGlobe, BiGlobeAlt, BiShield } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { CiCircleQuestion, CiGlobe } from "react-icons/ci";
import {
  FaCarAlt,
  FaClock,
  FaFlag,
  FaFlagUsa,
  FaGlobe,
  FaHandshake,
  FaShieldAlt,
} from "react-icons/fa";
import Image from "next/image";

export default function Databases() {
  return (
    <div className="min-h-screen bg-white">
      {/* Trust Section */}
      <section className="  px-4 py-20" style={{background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 35.36%, #3730A3 70.71%'
}}>
        <div className="max-w-6xl mx-auto text-white grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          <div>
            <h2 className="text-4xl font-bold mb-6">Trusted Data Partners</h2>
            <p className="text-blue-100 text-lg mb-12   ">
              Access comprehensive vehicle data through our network of premium
              partners. From vehicle history to market valuations, we connect
              you with the most reliable data sources in the industry.
            </p>
            <div className="flex  gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition ">
                View Integrations
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition ">
                Contact Sales
              </button>
            </div>
          </div>

          <div className=" flex items-end  gap-8 mb-12">
            <div className="bg-[#FFFFFF1A]  rounded-lg   w-[300px] h-[180px] flex flex-col  items-start justify-center px-6  ">
              <FaShieldAlt  className="w-8 h-8 mb-3" />
              <h3 className="font-bold mb-2">Verified Data</h3>
              <p className="text-blue-100">100% authentic vehicle records</p>
            </div>
            <div className="bg-[#FFFFFF1A] rounded-lg   w-[300px] h-[180px] md:h-[150px] flex flex-col  items-start justify-center px-6  ">
              <FaGlobe  className="w-8 h-8 mb-3" />
              <h3 className="font-bold mb-2">Global Coverage</h3>
              <p className="text-blue-100">Data from 50+ countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2  md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">25+</p>
              <p className="text-gray-600">Data Partners</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">500M+</p>
              <p className="text-gray-600">Vehicle Records</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">99.9%</p>
              <p className="text-gray-600">Uptime</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">50+</p>
              <p className="text-gray-600">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Data Partners */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Primary Data Partners
          </h2>
          <p className="text-center text-gray-600 mb-16">
            Industry-leading partnerships that power our comprehensive vehicle
            data platform
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                initials: "CF",
                name: "Carfax",
                title: "Vehicle History Leader",
                desc: "The most trusted source of vehicle history reports, providing comprehensive accident history, service records, and ownership details for millions of vehicles.",
                stats: [
                  { value: "40B+", label: "Records" },
                  { value: "100K+", label: "Data Sources" },
                ],
                link: "/carfax",
              },
              {
                initials: "AC",
                name: "AutoCheck",
                title: "Comprehensive Reports",
                desc: "Experian's AutoCheck provides detailed vehicle history reports with score-based rankings and comprehensive damage assessments for informed decision making.",
                stats: [
                  { value: "600M+", label: "Vehicle Records" },
                  { value: "50+", label: "Data Points" },
                ],
                link: "/autocheck",
              },
            ].map((partner, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center   font-bold text-lg ${
                      idx === 0
                        ? "bg-[#FEE2E2] text-red-500"
                        : "bg-[#DBEAFE] text-blue-500"
                    }`}
                  >
                    {partner.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{partner.name}</h3>
                    <p className="text-sm text-[#6B7280]">{partner.title}</p>
                  </div>
                </div>
                <p className="text-[#6B7280] text-base mb-6">{partner.desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-6 ">
                  {partner.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-[#F9FAFB] py-5 px-5 rounded-2xl flex flex-col items-start justify-center"
                    >
                      <p className="text-2xl font-bold text-gray-900 ">
                        {stat.value}
                      </p>
                      <p className="text-sm text-[#6B7280]">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt- ">
                  <span className="text-sm font-semibold text-green-600">
                    Active Partner
                  </span>
                  <a
                    href={partner.link}
                    className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1"
                  >
                    View Details <BsArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional API Partners */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Regional API Partners
          </h2>
          <p className="text-center text-gray-600 mb-16">
            Specialized data providers offering localized vehicle information
            and market insights
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "NMVTIS",
                icon: <FaFlagUsa size={17} className="text-orange-500" />,
                color: "#FFEDD5",
                subtitle: "US Federal Database",
                desc: "National Motor Vehicle Title Information System providing title, brand, and odometer data.",
                coverage: "USA",
              },
              {
                name: "CPIC",
                icon: (
                  <CiCircleQuestion size={20} className="text-orange-800" />
                ),
                color: "#FEE2E2",
                subtitle: "Canadian Database",
                desc: "Canadian Police Information Centre providing stolen vehicle and criminal records data.",
                coverage: "Canada",
              },
              {
                name: "DVLA",
                icon: <FaFlag size={17} className="text-blue-500" />,
                color: "#DBEAFE",
                subtitle: "UK Vehicle Registry",
                desc: "Driver and Vehicle Licensing Agency providing UK vehicle registration and MOT data.",
                coverage: "UK",
              },
              {
                name: "AutoScout24",
                icon: <FaCarAlt size={17} className="text-yellow-500 " />,
                color: "#FEF9C3",
                subtitle: "European Market Data",
                desc: "Leading European automotive marketplace providing market valuations and listings data.",
                coverage: "Europe",
              },
              {
                name: "JEVIC",
                icon: <CiGlobe size={17} className="text-green-500" />,
                color: "#DCFCE7",
                subtitle: "Japan Export Inspection",
                desc: "Japan Export Vehicle Inspection Center providing quality and condition reports for exported vehicles.",
                coverage: "Japan",
              },
              {
                name: "NEVDIS",
                icon: <CiCircleQuestion size={17} className="text-gray-500" />,
                color: "#F3E8FF",
                subtitle: "Australia Registry",
                desc: "National Exchange of Vehicle and Driver Information System for Australian vehicle data.",
                coverage: "Australia",
              },
            ].map((partner, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="flex gap-5 h-14 items-center  ">
                  <div
                    className={` p-4  not-[]: mb-3 rounded-xl`}
                    style={{ backgroundColor: partner.color }}
                  >
                    <span>{partner.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{partner.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {partner.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{partner.desc}</p>
                <div className="flex justify-between items-center pt-4 ">
                  <span className="text-sm font-semibold text-green-500">
                    Coverage: {partner.coverage}
                  </span>
                  <a
                    href="#"
                    className="text-blue-500 text-sm font-semibold hover:text-blue-600"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Global Coverage Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Global Coverage
          </h2>
          <p className="text-center text-gray-600 mb-16">
            Our data partner network spans across continents, providing
            comprehensive vehicle information worldwide
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center  p-8 bg-white rounded-2xl">
            <div className="">
              <Image src="/map.png" alt="map" className="rounded-xl" width={600} height={400} />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">
                Comprehensive Data Coverage
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">
                    <strong>North America:</strong> 95% coverage (US, Canada,
                    Mexico)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-green-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">
                    <strong>Europe:</strong> 85% coverage (27 EU countries + UK)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-amber-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">
                    <strong>Asia-Pacific:</strong> 70% coverage (Japan,
                    Australia, Singapore)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-purple-600 rounded-full mt-2"></span>
                  <span className="text-gray-700">
                    <strong>Latin America:</strong> 60% coverage (Brazil,
                    Argentina, Chile)
                  </span>
                </li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-8">
                Explore Coverage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Choose Our Data Partners
          </h2>
          <p className="text-center text-gray-600 mb-16">
            Trusted relationships built on reliability, accuracy, and
            comprehensive coverage
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <BiShield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Accuracy</h3>
              <p className="text-gray-600">
                All data undergoes rigorous verification processes to ensure
                99.5% accuracy across all partner sources.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FaClock className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Updates</h3>
              <p className="text-gray-600">
                Live data synchronization ensures you always have access to the
                most current vehicle information available.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaHandshake className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Trusted Partnerships</h3>
              <p className="text-gray-600">
                Long-standing relationships with industry leaders ensure stable
                access to premium data sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className=" text-2xl md:text-4xl font-bold text-white mb-6">
            Ready to Access Premium Vehicle Data?
          </h1>
          <p className="text-lg text-blue-100 mb-10">
            Join thousands of businesses leveraging our comprehensive data
            partner network for <br /> better decision making.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
