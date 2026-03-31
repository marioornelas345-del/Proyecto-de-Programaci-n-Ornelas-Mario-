import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPostAuthRedirect } from '@/lib/post-auth'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { data } = await supabase.auth.exchangeCodeForSession(code)
    
    // Determine redirect based on user metadata
    const user = data.user
    const redirectPath = getPostAuthRedirect(user?.user_metadata)
    
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  // Return the user to an error page if the code exchange fails
  return NextResponse.redirect(new URL('/auth/login?error=auth-callback-failed', request.url))
}
