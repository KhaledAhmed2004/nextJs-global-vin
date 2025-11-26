import { type LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  change: string
  changeType?: 'positive' | 'negative'
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeType = 'positive',
}: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
        <div
          className={`text-sm font-semibold ${
            changeType === 'positive' ? 'text-accent' : 'text-destructive'
          }`}
        >
          {change}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  )
}
