import React from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { UserCard } from './_components/UserCard'
import { MetricsHeader } from './_components/MetricsHeader'
import { SearchAndFilters } from './_components/SearchAndFilters'

interface AdminUsersPageProps {
  searchParams: Promise<{ q?: string; role?: string; page?: string }>
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const params = await searchParams
  const query = params.q || ''
  const roleFilter = params.role || 'All'
  
  // 1. Fetch metrics
  const { data: allProfiles } = await supabase.from('profiles').select('role, status')
  
  // 2. Build filtered query
  let queryBuilder = supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (query) {
    queryBuilder = queryBuilder.ilike('name', `%${query}%`)
  }

  if (roleFilter !== 'All') {
    queryBuilder = queryBuilder.eq('role', roleFilter)
  }

  const { data: users, error } = await queryBuilder

  return (
    <div className="min-h-screen bg-bg-light p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-nordic-dark mb-2">User Directory</h1>
            <p className="text-nordic-muted">Manage the elite community of LuxeEstate members.</p>
          </div>
          <Button className="h-12 bg-mosque text-white font-bold rounded-xl px-6 shadow-lg shadow-mosque/20">
            <span className="material-icons text-sm mr-2">person_add</span>
            Add New User
          </Button>
        </header>

        {/* Metrics Section */}
        <MetricsHeader profiles={allProfiles || []} />

        {/* Search & Filters Section */}
        <SearchAndFilters currentRole={roleFilter} currentQuery={query} />

        {/* User Grid */}
        <main>
          {users && users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-nordic-muted/20">
              <span className="material-icons text-nordic-muted/30 text-6xl mb-4">group_off</span>
              <h3 className="text-xl font-bold text-nordic-dark">No members found</h3>
              <p className="text-nordic-muted max-w-xs mx-auto">Try adjusting your search or filters to find what you&apos;re looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
