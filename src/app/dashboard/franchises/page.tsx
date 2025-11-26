'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatCard } from '@/components/DashboardComponents/StatCard/StartCard'
import { CircleDollarSign } from 'lucide-react'
import { MoreVertical } from 'lucide-react'

const franchiseData = [
  {
    id: 'FC001',
    name: 'TechCorp Solutions',
    domain: 'techcorp.franchise.com',
    reportsSold: 1247,
    revenue: '$89,450',
    plan: 'Per-Report Sales',
    status: 'Active',
  },
  {
    id: 'FC002',
    name: 'GreenTech Innovations',
    domain: 'greentech.franchise.com',
    reportsSold: 892,
    revenue: '$89,450',
    plan: 'Dealer Packages',
    status: 'Pending',
  },
  {
    id: 'FC003',
    name: 'Digital Dynamics',
    domain: 'digitaldynamics.franchise.com',
    reportsSold: 200,
    revenue: '$89,450',
    plan: 'API Access',
    status: 'Disabled',
  },
  {
    id: 'FC004',
    name: 'Analytics Pro',
    domain: 'analyticspro.franchise.com',
    reportsSold: 300,
    revenue: '$89,450',
    plan: 'White Label Resale',
    status: 'Active',
  },
  {
    id: 'FC005',
    name: 'Global Reach Ltd',
    domain: 'globalreach.franchise.com',
    reportsSold: 450,
    revenue: '$89,450',
    plan: 'Per-Report Sales',
    status: 'Disabled',
  },
]

const getPlanColor = (plan: string) => {
  switch (plan) {
    case 'Per-Report Sales':
      return 'bg-accent/20 text-accent'
    case 'Dealer Packages':
      return 'bg-primary/20 text-primary'
    case 'API Access':
      return 'bg-yellow-100 text-yellow-700'
    case 'White Label Resale':
      return 'bg-pink-100 text-pink-700'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'text-accent'
    case 'Pending':
      return 'text-yellow-600'
    case 'Disabled':
      return 'text-muted-foreground'
    default:
      return 'text-foreground'
  }
}

export default function FranchisesPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Stat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={CircleDollarSign}
          label="Total Franchises"
          value="$124,563"
          change="+12.5%"
          changeType="positive"
        />
      </div>

      {/* Search */}
      <div className="relative">
        <Input
          placeholder="Search here......."
          className="pl-10 h-12"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          🔍
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border">
        <button className="pb-3 text-sm font-medium text-foreground border-b-2 border-foreground">
          All
        </button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
          Per-Report Sales
        </button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
          Dealer Packages
        </button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
          API Access
        </button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
          Per-Report Sales
        </button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-b border-border">
              <TableHead className="font-semibold">Franchise Name</TableHead>
              <TableHead className="font-semibold">Domain</TableHead>
              <TableHead className="font-semibold">Reports Sold</TableHead>
              <TableHead className="font-semibold">Revenue</TableHead>
              <TableHead className="font-semibold">Plan</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {franchiseData.map((franchise) => (
              <TableRow key={franchise.id} className="border-b border-border hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div>
                    <div>{franchise.name}</div>
                    <div className="text-xs text-muted-foreground">ID: {franchise.id}</div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{franchise.domain}</TableCell>
                <TableCell className="text-sm">{franchise.reportsSold}</TableCell>
                <TableCell className="text-sm font-medium text-accent">{franchise.revenue}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(franchise.plan)}`}>
                    {franchise.plan}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`text-sm font-medium ${getStatusColor(franchise.status)}`}>
                    {franchise.status}
                  </span>
                </TableCell>
                <TableCell>
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreVertical size={18} className="text-muted-foreground" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          ← Previous
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded border border-border hover:bg-muted">1</button>
          <button className="w-8 h-8 rounded border border-border hover:bg-muted">2</button>
          <button className="w-8 h-8 rounded border border-border hover:bg-muted">3</button>
          <span className="text-muted-foreground">...</span>
        </div>
        <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          Next →
        </button>
      </div>
    </div>
  )
}
