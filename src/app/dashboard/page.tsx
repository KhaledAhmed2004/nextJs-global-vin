'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { CircleDollarSign, TrendingUp, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/DashboardComponents/StatCard/StartCard'

const revenueData = [
  { month: 'JAN', revenue: 2800 },
  { month: 'FEB', revenue: 2400 },
  { month: 'MAR', revenue: 3200 },
  { month: 'APR', revenue: 2900 },
  { month: 'MAY', revenue: 3500 },
  { month: 'JUN', revenue: 3100 },
  { month: 'JUL', revenue: 3800 },
  { month: 'AUG', revenue: 3400 },
  { month: 'SEP', revenue: 2900 },
  { month: 'OCT', revenue: 3300 },
  { month: 'NOV', revenue: 3600 },
  { month: 'DEC', revenue: 4000 },
]

const performanceData = [
  { month: 'JAN', value: 45 },
  { month: 'FEB', value: 52 },
  { month: 'MAR', value: 48 },
  { month: 'APR', value: 61 },
  { month: 'MAY', value: 55 },
  { month: 'JUN', value: 67 },
]

const apiActivityData = [
  { name: 'Daily', value: 32, fill: '#764BA2' },
  { name: 'Weekly', value: 68, fill: '#D9D9D9' },
]

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          icon={CircleDollarSign}
          label="Total Sales"
          value="$124,563"
          change="+12.5%"
          changeType="positive"
        />
        <StatCard
          icon={ClipboardList}
          label="Active Reports"
          value="8,642"
          change="+8.3%"
          changeType="positive"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue Growth"
          value="15,842"
          change="+12.5%"
          changeType="positive"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Total Revenue</h3>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto min-h-[44px] sm:min-h-0">
              Yearly ▼
            </Button>
          </div>
          <div className="h-[250px] sm:h-[280px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 12 }} width={50} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                  formatter={(value:any) => [`$${value}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#764BA2"
                  fill="#d4b5ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Activity */}
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center">
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">API Activity</h3>
          <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={apiActivityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {apiActivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 sm:mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>Daily: 32%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span>Weekly: 68%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Top Performing Franchises</h3>
        <div className="h-[250px] sm:h-[280px] lg:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} width={40} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #764BA2' }} />
              <Bar dataKey="value" fill="#764BA2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
