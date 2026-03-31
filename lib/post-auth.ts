/**
 * Determine the post-authentication redirect URL based on user metadata.
 * New users are directed to the profile setup flow, while returning users
 * go straight to the dashboard.
 */
export function getPostAuthRedirect(userMetadata: any): string {
  // Check if it's a new user (Supabase metadata usually includes this)
  if (userMetadata && userMetadata.is_new_user === true) {
    return '/auth/profile-setup'
  }

  // Default redirect for returning users
  return '/dashboard'
}
