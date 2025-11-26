'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/DashboardComponents/StatCard/StartCard'
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Filter,
  Search,
  Eye,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function ActivityPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedFranchise, setSelectedFranchise] = useState('all')

  // API Usage Data
  const apiUsageData = [
    { date: 'Jan 1', calls: 2400, success: 2350, failed: 50 },
    { date: 'Jan 2', calls: 2800, success: 2740, failed: 60 },
    { date: 'Jan 3', calls: 3200, success: 3150, failed: 50 },
    { date: 'Jan 4', calls: 2600, success: 2550, failed: 50 },
    { date: 'Jan 5', calls: 3500, success: 3420, failed: 80 },
    { date: 'Jan 6', calls: 3100, success: 3050, failed: 50 },
    { date: 'Jan 7', calls: 3800, success: 3720, failed: 80 }
  ]

  // Franchise Distribution
  const franchiseDistribution = [
    { name: 'AutoCheck Japan', value: 35, color: '#3B82F6' },
    { name: 'VinCheck UK', value: 25, color: '#8B5CF6' },
    { name: 'CarHistory Germany', value: 20, color: '#F59E0B' },
    { name: 'VehicleReport Brazil', value: 15, color: '#10B981' },
    { name: 'Others', value: 5, color: '#6B7280' }
  ]

  // Top Franchises by API Usage
  const topFranchises = [
    { name: 'AutoCheck Japan', calls: 12450, revenue: 6225, trend: '+15%', status: 'up' },
    { name: 'VinCheck UK', calls: 8920, revenue: 4460, trend: '+8%', status: 'up' },
    { name: 'VehicleReport Brazil', calls: 7340, revenue: 3670, trend: '+12%', status: 'up' },
    { name: 'CarHistory Germany', calls: 3200, revenue: 1600, trend: '-5%', status: 'down' },
    { name: 'AutoVin Australia', calls: 1450, revenue: 725, trend: '-18%', status: 'down' }
  ]

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      franchise: 'AutoCheck Japan',
      action: 'API Call',
      endpoint: 'GET /api/vehicle-history',
      status: 'success',
      timestamp: '2 min ago',
      duration: '245ms'
    },
    {
      id: 2,
      franchise: 'VinCheck UK',
      action: 'Credit Top-up',
      endpoint: 'Added $500 credits',
      status: 'success',
      timestamp: '5 min ago',
      duration: '-'
    },
    {
      id: 3,
      franchise: 'CarHistory Germany',
      action: 'API Call',
      endpoint: 'GET /api/vehicle-history',
      status: 'failed',
      timestamp: '8 min ago',
      duration: '1.2s'
    },
    {
      id: 4,
      franchise: 'VehicleReport Brazil',
      action: 'Bulk Purchase',
      endpoint: 'Purchased 50,000 calls package',
      status: 'success',
      timestamp: '15 min ago',
      duration: '-'
    },
    {
      id: 5,
      franchise: 'AutoVin Australia',
      action: 'API Call',
      endpoint: 'GET /api/vehicle-history',
      status: 'error',
      timestamp: '22 min ago',
      duration: 'timeout'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-green-100 text-green-700 border-green-200',
      failed: 'bg-red-100 text-red-700 border-red-200',
      error: 'bg-orange-100 text-orange-700 border-orange-200'
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time franchise activity and API usage tracking</p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Activity}
          label="Total API Calls"
          value="24,520"
          change="+12.5%"
          changeType="positive"
        />
        <StatCard
          icon={CheckCircle}
          label="Success Rate"
          value="98.2%"
          change="+0.5%"
          changeType="positive"
        />
        <StatCard
          icon={Clock}
          label="Avg Response Time"
          value="324ms"
          change="-15ms"
          changeType="positive"
        />
        <StatCard
          icon={TrendingUp}
          label="Active Franchises"
          value="138"
          change="5 today"
          changeType="positive"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Usage Trends */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">API Usage Trends</h3>
              <p className="text-sm text-gray-600 mt-1">Successful vs Failed API calls</p>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={apiUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="success" stroke="#10B981" strokeWidth={2} name="Successful" />
              <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} name="Failed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Franchise Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Usage by Franchise</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={franchiseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label
              >
                {franchiseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {franchiseDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Franchises */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Franchises</h3>
            <p className="text-sm text-gray-600 mt-1">Based on API usage and revenue</p>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Franchise</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">API Calls</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Revenue</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Trend</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topFranchises.map((franchise, index) => (
                <tr key={franchise.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-semibold text-gray-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{franchise.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{franchise.calls.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">${franchise.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {franchise.status === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={franchise.status === 'up' ? 'text-green-600' : 'text-red-600'}>
                        {franchise.trend}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <p className="text-sm text-gray-600 mt-1">Live feed of franchise activities</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              value={selectedFranchise}
              onChange={(e) => setSelectedFranchise(e.target.value)}
            >
              <option value="all">All Franchises</option>
              <option value="japan">AutoCheck Japan</option>
              <option value="uk">VinCheck UK</option>
              <option value="germany">CarHistory Germany</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex-shrink-0">
                {getStatusIcon(activity.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{activity.franchise}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{activity.action}</span>
                </div>
                <div className="text-sm text-gray-600">{activity.endpoint}</div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(activity.status)}`}>
                  {activity.status}
                </span>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{activity.timestamp}</div>
                  <div className="text-xs text-gray-500">{activity.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">Load More Activities</Button>
        </div>
      </div>
    </div>
  )
}
