'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  CreditCard,
  DollarSign,
  Package,
  TrendingUp,
  Plus,
  Check,
  Zap,
  Shield,
  Crown
} from 'lucide-react'
import { StatCard } from '@/components/DashboardComponents/StatCard/StartCard'

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'payg' | 'topup' | 'bulk'>('payg')
  const [topupAmount, setTopupAmount] = useState('100')
  const [bulkPackage, setBulkPackage] = useState('starter')

  const pricingPlans = {
    payg: {
      name: 'Pay as You Go',
      icon: Zap,
      color: 'blue',
      description: 'Perfect for testing or low-volume usage',
      features: [
        'No setup fees',
        'No monthly subscription',
        'Pay only for what you use',
        '$0.50 per API call',
        'Access to all databases',
        'Email support'
      ],
      pricing: '$0.50 per call'
    },
    topup: {
      name: 'Credit Top-Up',
      icon: CreditCard,
      color: 'purple',
      description: 'Flexible prepaid credits with better rates',
      features: [
        'Prepaid credit system',
        'Better pricing per call',
        'Credits never expire',
        '$0.35 per API call',
        'Priority support',
        'Volume discounts available'
      ],
      pricing: 'From $0.35 per call'
    },
    bulk: {
      name: 'Bulk Purchase',
      icon: Package,
      color: 'orange',
      description: 'Best value for high-volume franchises',
      features: [
        'Lowest per-call pricing',
        'Dedicated account manager',
        'Custom integration support',
        'From $0.15 per call',
        '24/7 priority support',
        'SLA guarantees'
      ],
      pricing: 'From $0.15 per call'
    }
  }

  const topupOptions = [
    { amount: 100, bonus: 0, total: 100, perCall: 0.35 },
    { amount: 500, bonus: 25, total: 525, perCall: 0.33 },
    { amount: 1000, bonus: 75, total: 1075, perCall: 0.30 },
    { amount: 2500, bonus: 250, total: 2750, perCall: 0.28 },
    { amount: 5000, bonus: 750, total: 5750, perCall: 0.25 }
  ]

  const bulkPackages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      calls: '10,000',
      price: 2500,
      perCall: 0.25,
      savings: '50%',
      features: ['10,000 API calls', 'Valid for 12 months', 'Email support', 'Basic analytics']
    },
    {
      id: 'growth',
      name: 'Growth Pack',
      calls: '50,000',
      price: 10000,
      perCall: 0.20,
      savings: '60%',
      popular: true,
      features: ['50,000 API calls', 'Valid for 12 months', 'Priority support', 'Advanced analytics', 'Custom reporting']
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pack',
      calls: '200,000',
      price: 30000,
      perCall: 0.15,
      savings: '70%',
      features: ['200,000 API calls', 'Valid for 12 months', '24/7 support', 'Dedicated manager', 'White-label options', 'SLA guarantee']
    }
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600 mt-1">Manage franchise billing, credits, and payment plans</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value="$124,563"
          change="+12.5%"
          changeType="positive"
        />
        <StatCard
          icon={CreditCard}
          label="Active Credits"
          value="$48,920"
          change="152 franchises"
          changeType="positive"
        />
        <StatCard
          icon={Package}
          label="Bulk Packages"
          value="87"
          change="+18 this month"
          changeType="positive"
        />
        <StatCard
          icon={TrendingUp}
          label="Avg. Revenue/Franchise"
          value="$819"
          change="+8.3%"
          changeType="positive"
        />
      </div>

      {/* Pricing Models Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Pricing Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(pricingPlans).map(([key, plan]) => {
            const Icon = plan.icon
            const isSelected = selectedPlan === key
            const colorClasses = {
              blue: 'border-blue-500 bg-blue-50',
              purple: 'border-purple-500 bg-purple-50',
              orange: 'border-orange-500 bg-orange-50'
            }
            const iconColors = {
              blue: 'text-blue-600',
              purple: 'text-purple-600',
              orange: 'text-orange-600'
            }

            return (
              <div
                key={key}
                onClick={() => setSelectedPlan(key as 'payg' | 'topup' | 'bulk')}
                className={`border-2 rounded-lg p-6 cursor-pointer transition ${
                  isSelected ? colorClasses[plan.color as keyof typeof colorClasses] : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center ${iconColors[plan.color as keyof typeof iconColors]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.pricing}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pay as You Go Section */}
      {selectedPlan === 'payg' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Pay as You Go</h2>
              <p className="text-gray-600 mt-1">Simple, straightforward pricing with no commitments</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">$0.50</div>
              <div className="text-sm text-gray-600">per API call</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">How it works</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium text-gray-900">Franchise makes API call</p>
                    <p className="text-sm text-gray-600">Each request is tracked automatically</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-medium text-gray-900">Usage is calculated</p>
                    <p className="text-sm text-gray-600">$0.50 charged per successful call</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium text-gray-900">Monthly invoice</p>
                    <p className="text-sm text-gray-600">Billed at the end of each month</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Current Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold text-gray-900">15,420 calls</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Cost</span>
                    <span className="text-2xl font-bold text-blue-600">$7,710</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top-Up Section */}
      {selectedPlan === 'topup' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Credit Top-Up Plans</h2>
            <p className="text-gray-600 mt-1">Prepaid credits with volume discounts and bonus credits</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topupOptions.map((option) => (
              <div
                key={option.amount}
                className={`border-2 rounded-lg p-6 cursor-pointer transition hover:shadow-lg ${
                  topupAmount === option.amount.toString() ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setTopupAmount(option.amount.toString())}
              >
                {option.bonus > 0 && (
                  <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-3 inline-block">
                    +${option.bonus} FREE
                  </div>
                )}
                <div className="text-3xl font-bold text-gray-900 mb-1">${option.amount}</div>
                <div className="text-sm text-gray-600 mb-4">
                  {option.bonus > 0 ? `Get $${option.total} credits` : 'Base amount'}
                </div>
                <div className="text-xs text-purple-600 font-semibold">
                  ${option.perCall} per call
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Selected Top-Up</h3>
                <p className="text-gray-600 mb-4">Add credits to franchise account</p>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Franchise</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>AutoCheck Japan</option>
                      <option>VinCheck UK</option>
                      <option>CarHistory Germany</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(e.target.value)}
                    >
                      {topupOptions.map((opt) => (
                        <option key={opt.amount} value={opt.amount}>
                          ${opt.amount} {opt.bonus > 0 && `(+$${opt.bonus} bonus)`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>Credit Card</option>
                      <option>Bank Transfer</option>
                      <option>PayPal</option>
                    </select>
                  </div>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Credits to Franchise
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Purchase Section */}
      {selectedPlan === 'bulk' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Bulk Purchase Packages</h2>
            <p className="text-gray-600 mt-1">Best value for high-volume franchises with significant savings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bulkPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative border-2 rounded-lg p-6 cursor-pointer transition ${
                  pkg.popular
                    ? 'border-orange-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setBulkPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-orange-600 mb-1">{pkg.calls}</div>
                  <div className="text-sm text-gray-600">API Calls</div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Total Price</span>
                    <span className="text-2xl font-bold text-gray-900">${pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Per Call</span>
                    <span className="text-lg font-semibold text-orange-600">${pkg.perCall}</span>
                  </div>
                  <div className="pt-2 border-t border-orange-200">
                    <span className="text-sm font-semibold text-green-600">Save {pkg.savings} vs Pay-as-you-go</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Select Package
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Enterprise Benefits</h3>
                <p className="text-sm text-gray-600">Unlock premium features with bulk packages</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Dedicated Support</h4>
                <p className="text-sm text-gray-600">24/7 priority support with dedicated account manager</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Custom Integration</h4>
                <p className="text-sm text-gray-600">Free custom API integration and white-label options</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">SLA Guarantee</h4>
                <p className="text-sm text-gray-600">99.9% uptime guarantee with compensation</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
