"use client"
import { useState } from 'react'
import { X, CircleDollarSign, Clock, Check, MoreVertical, ChevronDown } from 'lucide-react'
import { StatCard } from '@/components/DashboardComponents/StatCard/StartCard'

const discountCodes = [
  {
    code: 'WELCOME10',
    discount: '10%',
    uses: 200,
    maxUses: 20000,
    status: 'Active',
  },
  {
    code: 'SUMMER25',
    discount: '10%',
    uses: 892,
    maxUses: 30000,
    status: 'Active',
  },
  {
    code: 'SUMMER26',
    discount: '20%',
    uses: 200,
    maxUses: 40000,
    status: 'Active',
  },
  {
    code: 'WELCOME10',
    discount: '30%',
    uses: 300,
    maxUses: 500,
    status: 'Active',
  },
  {
    code: 'VIP50',
    discount: '25%',
    uses: 450,
    maxUses: 60000,
    status: 'Active',
  },
]

const pricingPlans = [
  {
    name: 'Basic Report',
    price: '$24.99',
    period: '/month',
    badge: 'Active',
    features: [
      'Vehicle Specs',
      'Market Value',
      'Recall Info',
      'Ownership History',
    ],
    reportsCount: '1245 reports sold',
  },
  {
    name: 'Basic Report',
    price: '$24.99',
    period: '/month',
    badge: 'Active',
    features: [
      'Everything in Basic',
      'Market Value',
      'Recall Info',
      'Ownership History',
    ],
    reportsCount: '1245 reports sold',
  },
  {
    name: 'Basic Report',
    price: '$24.99',
    period: '/month',
    badge: 'Active',
    features: [
      'Everything in Basic',
      'Market Value',
      'Recall Info',
      'Ownership History',
    ],
    reportsCount: '1245 reports sold',
  },
]

 

export default function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    packageName: '',
    price: '',
    currency: 'USD',
    features: '',
  })

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreate = () => {
    console.log('Package created:', formData)
    setIsModalOpen(false)
    setFormData({
      packageName: '',
      price: '',
      currency: 'USD',
      features: '',
    })
  }

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Stats */}
      <div className="bg-white border-2 border-purple-400/40 rounded-lg p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={CircleDollarSign}
            label="Active Packages"
            value="$124,563"
            change="+12.5%"
            changeType="positive"
          />
          <StatCard
            icon={Clock}
            label="Total Discount"
            value="8,642"
            change="+8.3%"
            changeType="positive"
          />
        </div>

        {/* Pricing Cards Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Report Packages</h2>
              <p className="text-gray-600">Manage your pricing packages and features</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
            >
              + Create Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 relative">
                {/* Actions */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded text-gray-700">✏️</button>
                  <button className="p-1.5 hover:bg-gray-100 rounded text-gray-700">🗑️</button>
                </div>

                {/* Badge */}
                <div className="mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                    {plan.badge}
                  </span>
                </div>

                {/* Price */}
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 text-sm">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <p className="text-xs text-gray-600">{plan.reportsCount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discount Codes Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Discount Codes</h2>
            <p className="text-gray-600">Create and manage promotional discount codes</p>
          </div>
          <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">
            + Create Package
          </button>
        </div>

        {/* Discount Codes Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Discount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Uses</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Max Uses</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {discountCodes.map((code, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium font-mono text-gray-900">{code.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{code.discount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{code.uses}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{code.maxUses}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {code.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <MoreVertical size={18} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-200">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Create Custom Package</h2>
                <p className="text-sm text-gray-600 mt-1">Set up a new pricing package</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 ml-4"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Package Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Package Name
                </label>
                <input
                  type="text"
                  name="packageName"
                  value={formData.packageName}
                  onChange={handleInputChange}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Price and Currency */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="https://api.example.com/v1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Currency
                  </label>
                  <div className="relative">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {currencies.map(curr => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Features (One Per Line)
                </label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 resize-none h-32"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleCreate}
                className="w-full px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}