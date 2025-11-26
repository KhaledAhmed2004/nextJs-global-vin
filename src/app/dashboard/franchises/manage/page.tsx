'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { startImpersonation } from '@/app/redux/features/auth/authSlice'
import { toast } from 'sonner'
import {
  CircleDollarSign,
  TrendingUp,
  Users,
  Activity,
  MoreVertical,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Lock,
  Unlock,
  DollarSign
} from 'lucide-react'
import { StatCard } from '@/components/DashboardComponents/StatCard/StartCard'

interface Franchise {
  id: string
  name: string
  country: string
  email: string
  status: 'active' | 'inactive' | 'suspended'
  plan: 'pay-as-you-go' | 'professional' | 'enterprise'
  balance: number
  apiCalls: number
  joined: string
}

export default function ManageFranchisesPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedFranchises, setSelectedFranchises] = useState<string[]>([])

  const handleViewFranchise = (franchiseId: string, franchiseName: string) => {
    dispatch(startImpersonation({ franchiseId }))
    toast.success(`Viewing ${franchiseName} dashboard (Read-only)`)
    router.push('/dashboard')
  }

  const handleToggleAccess = (franchise: Franchise) => {
    const newStatus = franchise.status === 'active' ? 'suspended' : 'active'
    toast.success(`${franchise.name} access ${newStatus === 'active' ? 'enabled' : 'disabled'}`)
    // Here you would make an API call to update the franchise status
  }

  const handleTopUp = (franchise: Franchise) => {
    // Navigate to billing page with franchise pre-selected
    router.push(`/dashboard/billing?franchise=${franchise.id}`)
  }

  const franchises: Franchise[] = [
    {
      id: '1',
      name: 'AutoCheck Japan',
      country: 'Japan',
      email: 'contact@autocheck.jp',
      status: 'active',
      plan: 'enterprise',
      balance: 5420.50,
      apiCalls: 15420,
      joined: '2024-01-15'
    },
    {
      id: '2',
      name: 'VinCheck UK',
      country: 'United Kingdom',
      email: 'info@vincheck.uk',
      status: 'active',
      plan: 'professional',
      balance: 1250.00,
      apiCalls: 8920,
      joined: '2024-03-22'
    },
    {
      id: '3',
      name: 'CarHistory Germany',
      country: 'Germany',
      email: 'support@carhistory.de',
      status: 'inactive',
      plan: 'pay-as-you-go',
      balance: 0,
      apiCalls: 120,
      joined: '2024-05-10'
    },
    {
      id: '4',
      name: 'VehicleReport Brazil',
      country: 'Brazil',
      email: 'contato@vehiclereport.br',
      status: 'active',
      plan: 'professional',
      balance: 2840.75,
      apiCalls: 12350,
      joined: '2024-02-08'
    },
    {
      id: '5',
      name: 'AutoVin Australia',
      country: 'Australia',
      email: 'hello@autovin.com.au',
      status: 'suspended',
      plan: 'enterprise',
      balance: -150.00,
      apiCalls: 450,
      joined: '2023-11-20'
    }
  ]

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      inactive: 'bg-gray-100 text-gray-700 border-gray-200',
      suspended: 'bg-red-100 text-red-700 border-red-200'
    }
    return styles[status as keyof typeof styles] || styles.inactive
  }

  const getPlanBadge = (plan: string) => {
    const styles = {
      'pay-as-you-go': 'bg-blue-100 text-blue-700',
      'professional': 'bg-purple-100 text-purple-700',
      'enterprise': 'bg-orange-100 text-orange-700'
    }
    return styles[plan as keyof typeof styles] || styles['pay-as-you-go']
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Franchise Management</h1>
          <p className="text-gray-600 mt-1">Manage all franchises, access control, and billing</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Franchise
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Franchises"
          value="152"
          change="+8 this month"
          changeType="positive"
        />
        <StatCard
          icon={Activity}
          label="Active Franchises"
          value="138"
          change="90.8%"
          changeType="positive"
        />
        <StatCard
          icon={CircleDollarSign}
          label="Total Revenue"
          value="$425,840"
          change="+15.3%"
          changeType="positive"
        />
        <StatCard
          icon={TrendingUp}
          label="API Calls (30d)"
          value="2.4M"
          change="+22.5%"
          changeType="positive"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search franchises by name, country, or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          {/* Plan Filter */}
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Plans</option>
            <option value="pay-as-you-go">Pay as You Go</option>
            <option value="professional">Professional</option>
            <option value="enterprise">Enterprise</option>
          </select>

          {/* Export */}
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Franchises Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Franchise</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Balance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">API Calls</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {franchises.map((franchise) => (
                <tr key={franchise.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {franchise.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{franchise.name}</div>
                        <div className="text-sm text-gray-500">{franchise.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(franchise.status)}`}>
                      {franchise.status.charAt(0).toUpperCase() + franchise.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPlanBadge(franchise.plan)}`}>
                      {franchise.plan === 'pay-as-you-go' ? 'Pay as You Go' : franchise.plan.charAt(0).toUpperCase() + franchise.plan.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${franchise.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ${franchise.balance.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {franchise.apiCalls.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(franchise.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewFranchise(franchise.id, franchise.name)}
                        title="View franchise dashboard (read-only)"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`h-8 w-8 p-0 ${franchise.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                        onClick={() => handleToggleAccess(franchise)}
                        title={franchise.status === 'active' ? 'Disable access' : 'Enable access'}
                      >
                        {franchise.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                        onClick={() => handleTopUp(franchise)}
                        title="Top-up credits"
                      >
                        <DollarSign className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">1-5</span> of <span className="font-semibold">152</span> franchises
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
