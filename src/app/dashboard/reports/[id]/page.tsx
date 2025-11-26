'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Printer, Download } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = ['overview', 'history', 'service-records', 'specifications']
  const tabLabels = {
    overview: 'Overview',
    history: 'History',
    'service-records': 'Service Records',
    specifications: 'Specifications'
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard/reports" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={20} />
            Back to Reports
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 size={16} />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer size={16} />
              Print
            </Button>
            <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
              <Download size={16} />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Report Info */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Monthly Sales Report</h1>
              <p className="text-sm text-muted-foreground">Report ID: #RPT-005</p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              Delivered
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Date Created</p>
              <p className="font-semibold">Oct 25, 2024</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">VIN</p>
              <p className="font-semibold">1HGBH41JXMN109186</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-semibold">$49.99</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vehicle</p>
              <p className="font-semibold">2024 Honda Accord</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 border-b border-border mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-foreground border-b-2 border-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tabLabels[tab as keyof typeof tabLabels]}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vehicle Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Vehicle Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">2024</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Make</span>
                  <span className="font-medium">Honda</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">Accord</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Trim</span>
                  <span className="font-medium">Sport</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Body Style</span>
                  <span className="font-medium">Sedan</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Engine</span>
                  <span className="font-medium">1.5L Turbo I4</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Transmission</span>
                  <span className="font-medium">CVT Automatic</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Drivetrain</span>
                  <span className="font-medium">FWD</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Mileage</span>
                  <span className="font-medium">12,450 miles</span>
                </div>
              </div>
            </div>

            {/* Title & Accident Information */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-6">Title Information</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title Status</span>
                    <span className="font-medium">Clean Title</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Brand History</span>
                    <span className="font-medium">None</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Salvage</span>
                    <span className="font-medium">No</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Rebuilt</span>
                    <span className="font-medium">No</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Flood Damage</span>
                    <span className="font-medium">No</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Lemon Status</span>
                    <span className="font-medium">No</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-6">Accident History</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Accidents</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Minor Damage</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Moderate Damage</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-muted-foreground">Severe Damage</span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Ownership History</h2>
            <div className="space-y-6 border-l-4 border-primary pl-6">
              <div className="pb-6 border-b border-border">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Owner #1</h3>
                  <span className="text-sm text-muted-foreground">Jan 15</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Purchase Date: Jan 15</p>
                <p className="text-sm text-muted-foreground mb-2">Duration: 10 months</p>
                <p className="text-sm text-muted-foreground">Mileage Range: 0 - 12,450</p>
                <p className="text-sm text-muted-foreground">State: California</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'service-records' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Service History</h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-border">
                <h3 className="font-semibold mb-2">Oil Change & Inspection</h3>
                <p className="text-sm text-muted-foreground mb-1">Honda Service Center</p>
                <p className="text-sm text-muted-foreground mb-3">Sep 20, 2024 · 10,000 miles</p>
                <p className="text-lg font-semibold text-primary">$89.99</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Flat Maintenance Service</h3>
                <p className="text-sm text-muted-foreground mb-1">Honda Service Center</p>
                <p className="text-sm text-muted-foreground mb-3">May 15, 2024 · 5,000 miles</p>
                <p className="text-lg font-semibold text-primary">$125.00</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Fuel Type</span>
                  <span className="font-medium">Gasoline</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Fuel Economy</span>
                  <span className="font-medium">30 cty / 38 highway mpg</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Seating Capacity</span>
                  <span className="font-medium">5 passengers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doors</span>
                  <span className="font-medium">4</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">3,131 lbs</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Length</span>
                  <span className="font-medium">192.2 in</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Width</span>
                  <span className="font-medium">73.3 in</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-medium">57.1 in</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exterior & Recall Information (visible on overview tab) */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Exterior & Interior</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exterior Color</span>
                  <span className="font-medium">Modern Steel Metallic</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Interior Color</span>
                  <span className="font-medium">Black</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Recall Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Airbag System</span>
                  <span className="font-medium text-green-600">Completed</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Aug 10, 2024</span>
                  <span className="text-sm text-muted-foreground">Software update for airbag deployment system</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
