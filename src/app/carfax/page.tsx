"use client";

import { useState } from "react";
import { BsArrowRight, BsCheckCircleFill } from "react-icons/bs";
import {
  FaShieldAlt,
  FaGlobe,
  FaHistory,
  FaCarCrash,
  FaFileAlt,
  FaUserCheck,
  FaClock,
  FaDatabase,
} from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser, HiOutlineOfficeBuilding } from "react-icons/hi";

export default function CarfaxPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          source: "carfax",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const features = [
    {
      icon: <FaCarCrash className="w-6 h-6" />,
      title: "Accident History",
      description:
        "Complete accident and damage records from insurance claims and police reports.",
    },
    {
      icon: <FaHistory className="w-6 h-6" />,
      title: "Service Records",
      description:
        "Detailed maintenance history from dealerships and service centers nationwide.",
    },
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      title: "Title Information",
      description:
        "Title brands, salvage history, and lien records from DMV databases.",
    },
    {
      icon: <FaUserCheck className="w-6 h-6" />,
      title: "Ownership History",
      description:
        "Number of previous owners, registration states, and usage type.",
    },
    {
      icon: <FaDatabase className="w-6 h-6" />,
      title: "Odometer Readings",
      description:
        "Historical mileage data to detect rollbacks and verify accuracy.",
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Recall Information",
      description:
        "Open recalls and safety campaigns from manufacturers.",
    },
  ];

  const benefits = [
    "Access to 40+ billion vehicle records",
    "100,000+ data sources integrated",
    "Real-time API responses",
    "99.9% uptime guarantee",
    "Dedicated technical support",
    "Flexible pricing plans",
  ];

  return (
    <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          className="px-4 py-20"
          style={{
            background:
              "linear-gradient(135deg, #DC2626 0%, #B91C1C 35.36%, #991B1B 70.71%)",
          }}
        >
          <div className="max-w-6xl mx-auto text-white grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium">Official Carfax Partner</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Carfax Vehicle History Reports API
              </h1>
              <p className="text-red-100 text-lg mb-8">
                Integrate the most trusted vehicle history data into your
                platform. Access comprehensive accident history, service
                records, and ownership details for millions of vehicles through
                our powerful API.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact-form"
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
                >
                  Get API Access <BsArrowRight />
                </a>
                <a
                  href="#features"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  View Features
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg w-full max-w-[320px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-500 p-3 rounded-lg">
                    <FaShieldAlt className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Verified Data</h3>
                    <p className="text-red-100 text-sm">100% authentic records</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 p-3 rounded-lg">
                    <FaGlobe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">US Coverage</h3>
                    <p className="text-red-100 text-sm">All 50 states included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-red-600 mb-2">40B+</p>
                <p className="text-gray-600">Vehicle Records</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-600 mb-2">100K+</p>
                <p className="text-gray-600">Data Sources</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-600 mb-2">99.9%</p>
                <p className="text-gray-600">API Uptime</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-600 mb-2">50</p>
                <p className="text-gray-600">US States</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Comprehensive Vehicle Data
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Access the full spectrum of Carfax vehicle history data through
              our easy-to-integrate API
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
                >
                  <div className="bg-red-100 text-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              How It Works
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Get started with Carfax API integration in three simple steps
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Sign Up",
                  description:
                    "Create your GlobalVIN account and request Carfax API access.",
                },
                {
                  step: "02",
                  title: "Integrate",
                  description:
                    "Use our SDKs and documentation to integrate the API into your platform.",
                },
                {
                  step: "03",
                  title: "Go Live",
                  description:
                    "Start pulling vehicle history reports and serve your customers.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose GlobalVIN for Carfax Data?
                </h2>
                <p className="text-gray-600 mb-8">
                  As an official Carfax partner, we provide seamless access to
                  the most comprehensive vehicle history database in North
                  America.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <BsCheckCircleFill className="text-green-500 w-5 h-5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-100 text-red-600 p-4 rounded-xl">
                    <BiSupport className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">24/7 Support</h3>
                    <p className="text-gray-600">Dedicated technical team</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 text-red-600 p-4 rounded-xl">
                    <FaClock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Fast Integration</h3>
                    <p className="text-gray-600">Go live in hours, not weeks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Capture Form Section */}
        <section id="contact-form" className="px-4 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Get Started with Carfax API
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Fill out the form below and our team will contact you within 24
              hours
            </p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <BsCheckCircleFill className="text-green-500 w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-700">
                  We&apos;ve received your request. Our team will contact you within
                  24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-xl p-8"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <HiOutlineOfficeBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message / Inquiry
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
                    placeholder="Tell us about your project and how you plan to use the Carfax API..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Request API Access <BsArrowRight />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 bg-gradient-to-r from-red-600 to-red-800">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Access Carfax Vehicle Data?
            </h2>
            <p className="text-red-100 text-lg mb-8">
              Join thousands of businesses using GlobalVIN to access premium
              Carfax vehicle history reports.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contact-form"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Started Now
              </a>
              <a
                href="/databases"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                View All Databases
              </a>
            </div>
          </div>
        </section>
      </div>
  );
}
