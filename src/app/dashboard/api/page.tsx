"use client"

import { useState } from 'react'
import { X, CircleDollarSign, Clock, FileText, MoreVertical } from 'lucide-react'
import { StatCard } from '@/components/DashboardComponents/StatCard/StartCard'

const apiData = [
  {
    name: 'Production API',
    status: 'pk_live_51H7...',
    lastSync: '2 hours ago',
    requests: '1,234',
    statusBadge: 'Active',
  },
  {
    name: 'Development API',
    status: 'pk_test_51H7...',
    lastSync: '1 day ago',
    requests: '1,23',
    statusBadge: 'Active',
  },
  {
    name: 'Legacy API',
    status: 'pk_test_51H7...',
    lastSync: 'Never',
    requests: '1,23',
    statusBadge: 'Expired',
  },
]

const dataProviders = ['NMVTIS', 'CARFAX', 'Autocheck', 'Custom API']
const authMethods = ['Bearer Token', 'Basic Auth', 'OAuth 2.0', 'API key']



export default function APIPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    dataProvider: '',
    sourceName: '',
    apiEndpoint: '',
    apiKey: '',
    apiSecret: '',
    authMethod: '',
  })

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleComplete = () => {
    console.log('Form submitted:', formData)
    setIsModalOpen(false)
    setFormData({
      dataProvider: '',
      sourceName: '',
      apiEndpoint: '',
      apiKey: '',
      apiSecret: '',
      authMethod: '',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={CircleDollarSign}
            label="Total API"
            value="$124,563"
            change="+12.5%"
            changeType="positive"
          />
          <StatCard
            icon={Clock}
            label="Total Expired"
            value="8,642"
            change="+8.3%"
            changeType="positive"
          />
          <StatCard
            icon={FileText}
            label="Total Active"
            value="15,842"
            change="+12.5%"
            changeType="positive"
          />
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search here......."
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-[#764BA2] hover:bg-purple-700 text-white rounded-lg font-medium transition"
          >
            Add New Key +
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Sync</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Requests</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apiData.map((api, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{api.name}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">{api.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{api.lastSync}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{api.requests}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        api.statusBadge === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {api.statusBadge}
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

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            ← Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 text-sm font-medium">2</button>
            <button className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 text-sm font-medium">3</button>
            <span className="text-gray-400">...</span>
          </div>
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            Next →
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-200">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">Add New Data Source</h2>
                <p className="text-sm text-gray-500 mt-1">Configure a new API integration in 1 of 3 steps</p>
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
              {/* Data Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Provider
                </label>
                <select
                  name="dataProvider"
                  value={formData.dataProvider}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                  <option value="">Enter Product Name</option>
                  {dataProviders.map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>

              {/* Source Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Name
                </label>
                <input
                  type="text"
                  name="sourceName"
                  value={formData.sourceName}
                  onChange={handleInputChange}
                  placeholder="My custom API"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* API Endpoint URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Endpoint URL
                </label>
                <input
                  type="text"
                  name="apiEndpoint"
                  value={formData.apiEndpoint}
                  onChange={handleInputChange}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  name="apiKey"
                  value={formData.apiKey}
                  onChange={handleInputChange}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* API Secret */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Secret
                </label>
                <input
                  type="text"
                  name="apiSecret"
                  value={formData.apiSecret}
                  onChange={handleInputChange}
                  placeholder="https://api.example.com/v1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Authentication Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authentication Method
                </label>
                <select
                  name="authMethod"
                  value={formData.authMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                  <option value="">Enter Product Name</option>
                  {authMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}