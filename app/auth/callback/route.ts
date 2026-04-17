import { createServerClient, type CookieOptions } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPostAuthRedirect } from '@/lib/post-auth'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) throw error

      // Determine redirect based on user metadata or 'next' param
      const user = data.user
      const redirectPath = getPostAuthRedirect(user?.user_metadata)
      
      // If there's a 'next' param, we could prioritize it, but getPostAuthRedirect 
      // is likely more specific to our app flow (e.g. profile setup)
      return NextResponse.redirect(new URL(redirectPath, request.url))
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(new URL('/auth/login?error=auth-callback-failed', request.url))
    }
  }

  // If no code is present, check if there's an error in the URL from Supabase
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  if (error) {
    console.error('Supabase OAuth error:', error, error_description)
  }

  // Return the user to an error page if the code is missing or exchange fails
  return NextResponse.redirect(new URL(`/auth/login?error=${error || 'auth-callback-failed'}`, request.url))
}
