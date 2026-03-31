'use client'

import React from 'react'
import { updateUserRole, updateUserStatus } from '../actions'
import { toast } from 'sonner'

interface UserCardProps {
  user: any
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const handleRoleChange = async (newRole: string) => {
    const res = await updateUserRole(user.id, newRole)
    if (res.error) toast.error(res.error)
    else toast.success(`Role updated to ${newRole}`)
  }

  const handleStatusToggle = async () => {
    const newStatus = user.status === 'Suspended' ? 'Active' : 'Suspended'
    const res = await updateUserStatus(user.id, newStatus)
    if (res.error) toast.error(res.error)
    else toast.success(`User status set to ${newStatus}`)
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-soft border border-nordic-muted/5 group hover:border-mosque/20 transition-all">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-bg-light group-hover:border-mosque/30 transition-all" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-bg-light flex items-center justify-center text-nordic-muted group-hover:bg-mosque/5 transition-all">
              <span className="material-icons text-3xl">person</span>
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
            user.status === 'Active' ? 'bg-green-500' : user.status === 'Suspended' ? 'bg-red-500' : 'bg-yellow-500'
          }`}>
            <span className="material-icons text-white text-[10px]">
              {user.status === 'Active' ? 'check' : user.status === 'Suspended' ? 'close' : 'timer'}
            </span>
          </div>
        </div>

        <h4 className="text-lg font-bold text-nordic-dark line-clamp-1">{user.name || 'Elite Member'}</h4>
        <p className="text-xs font-bold text-mosque uppercase tracking-widest mb-4">{user.role || 'Member'}</p>
        
        <div className="w-full pt-4 border-t border-nordic-muted/5 space-y-3">
          <div className="flex items-center gap-2 text-sm text-nordic-muted">
            <span className="material-icons text-sm">mail</span>
            <span className="truncate">{user.id.slice(0, 12)}...</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-nordic-muted">
            <span className="material-icons text-sm">calendar_today</span>
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full mt-6">
          <button 
            onClick={() => handleRoleChange(user.role === 'Admin' ? 'Agent' : 'Admin')}
            className="h-10 rounded-xl bg-bg-light hover:bg-mosque/5 text-nordic-dark text-xs font-bold transition-all"
          >
            Switch Role
          </button>
          <button 
            onClick={handleStatusToggle}
            className={`h-10 rounded-xl text-xs font-bold transition-all ${
              user.status === 'Suspended' 
                ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            {user.status === 'Suspended' ? 'Reactivate' : 'Suspend'}
          </button>
        </div>
      </div>
    </div>
  )
}
