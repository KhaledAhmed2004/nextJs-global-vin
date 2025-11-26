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
 
import { CircleDollarSign, FileText, CheckCircle2, Clock } from 'lucide-react'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { StatCard } from '@/components/DashboardComponents/StatCard/StartCard'

const reportsData = [
  {
    id: 'RPT-001',
    title: 'Monthly Sales Report',
    vin: '1HGBH41JXMN109186',
    dateCreated: 'Oct 25, 2024',
    price: '$49.99',
    status: 'Delivered',
  },
  {
    id: 'RPT-002',
    title: 'Inventory Analysis',
    vin: '5FNRLGH76LB012345',
    dateCreated: 'Oct 24, 2024',
    price: '$49.99',
    status: 'Pending',
  },
  {
    id: 'RPT-003',
    title: 'Customer Satisfaction Survey',
    vin: '2C3CDXHG7JH123456',
    dateCreated: 'Oct 23, 2024',
    price: '$49.99',
    status: 'Pending',
  },
  {
    id: 'RPT-004',
    title: 'Financial Summary Q3',
    vin: '1GCVKREC3FZ123456',
    dateCreated: 'Oct 22, 2024',
    price: '$49.99',
    status: 'Failed',
  },
  {
    id: 'RPT-005',
    title: 'Employee Performance Review',
    vin: '3VW2B7AJ3DM123456',
    dateCreated: 'Oct 21, 2024',
    price: '$49.99',
    status: 'Delivered',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-accent/20 text-accent'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'Failed':
      return 'bg-destructive/20 text-destructive'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          label="Total Reports"
          value="$124,563"
          change="+12.5%"
          changeType="positive"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value="8,642"
          change="+8.3%"
          changeType="positive"
        />
        <StatCard
          icon={FileText}
          label="Active Plan"
          value="8,642"
          change="+8.3%"
          changeType="positive"
        />
        <StatCard
          icon={Clock}
          label="Pending Reports"
          value="15,842"
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
          Delivered
        </button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
          Pending
        </button>
        <button className="pb-3 text-sm font-medium text-muted-foreground hover:text-foreground">
          Failed
        </button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-b border-border">
              <TableHead className="font-semibold">Report ID</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">VIN</TableHead>
              <TableHead className="font-semibold">Date Created</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportsData.map((report) => (
              <TableRow key={report.id} className="border-b border-border hover:bg-muted/50">
                <TableCell className="font-medium text-primary">
                  <Link href={`/dashboard/reports/${report.id}`} className="hover:underline">
                    {report.id}
                  </Link>
                </TableCell>
                <TableCell className="text-sm">{report.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{report.vin}</TableCell>
                <TableCell className="text-sm">{report.dateCreated}</TableCell>
                <TableCell className="text-sm font-medium">{report.price}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
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
