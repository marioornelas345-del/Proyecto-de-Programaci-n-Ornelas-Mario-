import React from 'react'

interface MetricsHeaderProps {
  profiles: { role: string | null; status: string | null }[]
}

export const MetricsHeader: React.FC<MetricsHeaderProps> = ({ profiles }) => {
  const stats = {
    total: profiles.length,
    admins: profiles.filter(p => p.role === 'Admin').length,
    agents: profiles.filter(p => p.role === 'Agent').length,
    brokers: profiles.filter(p => p.role === 'Broker').length,
    suspended: profiles.filter(p => p.status === 'Suspended').length
  }

  const metricCards = [
    { label: 'Total Members', value: stats.total, icon: 'groups', color: 'bg-mosque' },
    { label: 'Elite Agents', value: stats.agents, icon: 'verified_user', color: 'bg-primary' },
    { label: 'Brokers', value: stats.brokers, icon: 'business_center', color: 'bg-nordic-dark' },
    { label: 'Suspended', value: stats.suspended, icon: 'block', color: 'bg-red-500' }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricCards.map((card) => (
        <div key={card.label} className="bg-white p-6 rounded-3xl shadow-soft border border-nordic-muted/10 flex items-center gap-5">
          <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center text-white`}>
            <span className="material-icons text-2xl">{card.icon}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-nordic-muted uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-black text-nordic-dark">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
