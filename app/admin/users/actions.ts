'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Create a service role client for admin actions
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['Buyer', 'Seller', 'Agent', 'Admin', 'Broker']),
  status: z.enum(['Active', 'Pending', 'Suspended']).default('Active')
})

export async function createAdminUser(data: z.infer<typeof userSchema>) {
  const validated = userSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Invalid user data' }
  }

  // 1. Create user in auth.users
  const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: validated.data.email,
    password: Math.random().toString(36).slice(-12), // Temporary random password
    email_confirm: true,
    user_metadata: { full_name: validated.data.name }
  })

  if (authError) {
    return { error: authError.message }
  }

  // 2. Profile is automatically created by the trigger, but we update role/status
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .update({
      role: validated.data.role,
      status: validated.data.status,
      name: validated.data.name
    })
    .eq('id', userData.user.id)

  if (profileError) {
    return { error: profileError.message }
  }

  revalidatePath('/admin/users')
  return { success: true }
}

export async function updateUserRole(userId: string, role: string) {
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) return { error: error.message }
  
  revalidatePath('/admin/users')
  return { success: true }
}

export async function updateUserStatus(userId: string, status: string) {
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ status })
    .eq('id', userId)

  if (error) return { error: error.message }
  
  revalidatePath('/admin/users')
  return { success: true }
}
