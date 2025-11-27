"use client";
import Image from "next/image";

import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export default function HomeSection() {
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("All Articles");

 interface MarketGrowthItem {
    id:number
    image:string;
    title:string,
    desc:string

 }

  const marketGrowthData:MarketGrowthItem[] = [
  {
    id:1,
    image: "/Analytics.png" ,
    title: "Used Car Market Growth in Emerging Markets",
    desc: "Analysis of the expanding used car markets in Southeast Asia and Africa, and opportunities for vehicle history services.",
  },
  {
    id:2,
    image: "/Analytics.png",
    title: "Digital Transformation in Vehicle Sales",
    desc: "Exploring how online platforms are revolutionizing the used car industry and creating new data opportunities.",
  },
  {
    id:3,
    image: "/Analytics.png",
    title: "Consumer Trust and Vehicle History Reports",
    desc: "Highlighting the rising importance of transparent vehicle histories for buyers and sellers in emerging economies.",
  },
  {
    id:4,
    image: "/Analytics.png",
    title: "Market Trends in Southeast Asia",
    desc: "Examining the rapid growth of the used vehicle sector across Thailand, Malaysia, and Indonesia.",
  },
  {
    id:5,
    image: "/Analytics.png",
    title: "Africa's Expanding Automotive Ecosystem",
    desc: "Insights into how affordable used cars are driving mobility and economic opportunity across African markets.",
  },
  {
    id:6,
    image: "/Analytics.png",
    title: "Opportunities for Data Integration",
    desc: "Identifying how digital record systems and APIs can enhance trust in global used car markets.",
  },
];


  const tabs = [
    "All Articles",
    "Franchise News",
    "Vehicle Data",
    "Global Trends",
    "Fraud Prevention",
    "Industry Insights",
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Insights & Resources Header */}
      <section className="bg-[#1E3A8A] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 min-h-[300px] sm:min-h-[350px] md:h-[450px] flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5">
            Insights & <span className="text-[#06B6D4]">Resources</span>
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mt-1 px-2">
            Stay informed with the latest trends in vehicle verification, fraud
            prevention, and automotive industry insights from GlobalVIN experts.
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-2 sm:gap-3 justify-start sm:justify-center mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] rounded-full font-semibold text-sm sm:text-base transition whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-[#E5E7EB] text-gray-500 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

              <div className="flex justify-center md:justify-start min-h-[250px] sm:min-h-[300px] md:min-h-96 p-4 sm:p-6 md:p-10">
                <Image src="/Analytics.png" alt="analytics" className="rounded-2xl overflow-hidden object-cover w-full h-auto" width={600} height={400} />
              </div>

              {/* Article Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  The Rise of VIN Cloning: How to Protect Your Business
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Discover the latest trends in vehicle identity fraud and learn
                  advanced verification techniques that protect dealers and
                  consumers from sophisticated VIN cloning schemes.
                </p>
                <button className="mt-4 sm:mt-6 text-blue-600 font-semibold hover:text-blue-700 transition flex items-center gap-2 w-fit min-h-[44px]">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Latest Articles</h2>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 min-h-[44px]">
              <span className="text-gray-700 font-medium text-sm sm:text-base">Most Recent</span>
              <BiChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {marketGrowthData?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-video relative">
                  <Image src={item?.image} alt="blue print" fill className="object-cover" />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                    {item?.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                     {item?.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition min-h-[44px] w-full sm:w-auto">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base">
            Get the latest insights and industry news delivered to your inbox
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none bg-white min-h-[44px] text-base"
            />
            <button
              type="submit"
              className="bg-[#05B5D4] hover:bg-[#05b5d4ea] text-white px-6 py-3 rounded-lg font-semibold transition min-h-[44px] w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
