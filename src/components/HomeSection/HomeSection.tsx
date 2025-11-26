"use client";
import Image from "next/image";

import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";

export default function HomeSection() {
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("All Articles");
  const [articles, setArticles] = useState(Array(6).fill(null));

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
      <section className="bg-[#1E3A8A] px-4 py-20 h-[450px] flex items-center">
        <div className="max-w-4xl mx-auto text-center ">
          <h2 className="text-5xl font-bold text-white mb-5">
            Insights & <span className="text-[#06B6D4]">Resources</span>
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mt-1">
            Stay informed with the latest trends in vehicle verification, fraud
            prevention, and automotive industry insights from GlobalVIN experts.
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-44 h-12 rounded-full font-semibold transition ${
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
            <div className="grid md:grid-cols-2 gap-0">
             
              <div className=" flex  justify-start min-h-96 p-10 ">
             <Image src="/Analytics.png" alt="analytics" className="rounded-2xl overflow-hidden" width={600} height={400} />
              </div>

              {/* Article Content */}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  The Rise of VIN Cloning: How to Protect Your Business
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Discover the latest trends in vehicle identity fraud and learn
                  advanced verification techniques that protect dealers and
                  consumers from sophisticated VIN cloning schemes.
                </p>
                <button className="mt-6 text-blue-600 font-semibold hover:text-blue-700 transition flex items-center gap-2 w-fit">
                  Read More →
                </button>
              </div>
            </div>
          </div>

          {/* Additional Articles Grid */}
          {/* <div className="grid md:grid-cols-3 gap-6 mt-12">
            { 
              marketGrowthData?.map((item) => (
                <div
                key={item.id}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition"
                >
                 <div>
                    <Image src="/bluePrint.png" alt="bluePrint" width={400} height={300} />
                 </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Market Trends 2024
                  </h4>
                  <p className="text-sm text-gray-600">
                    Comprehensive analysis of emerging trends in vehicle data
                    and market opportunities.
                  </p>
                </div>
              ))}
          </div> */}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className=" text-3xl md:text-4xl font-bold">Latest Articles</h2>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
              <span className="text-gray-700 font-medium">Most Recent</span>
              <BiChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
 
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {marketGrowthData?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className=" ">
                  <Image src={item?.image} alt="blue print" width={400} height={300} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {item?.title}
                  </h3>
                  <p className="text-gray-600">
                     {item?.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Need More Resources?</h3>
          <p className="text-blue-100 mb-8">
            Access our complete knowledge base and download industry reports
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition">
            View All Resources
          </button>
        </div>
      </section> */}

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8">
            Get the latest insights and industry news delivered to your inbox
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-[#05B5D4] hover:bg-[#05b5d4ea] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
