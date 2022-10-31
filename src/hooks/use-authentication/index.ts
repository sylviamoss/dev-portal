import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import {
	AuthErrors,
	SessionData,
	UserData,
	ValidAuthProviderId,
} from 'types/auth'
import { useFlags } from 'flags/client'
import { UseAuthenticationOptions, UseAuthenticationResult } from './types'
import { signInWrapper, signOutWrapper, signUp } from './helpers'
import { safeGetSegmentAnonymousId, safeGetSegmentId } from 'lib/analytics'

export const DEFAULT_PROVIDER_ID = ValidAuthProviderId.CloudIdp

/**
 * Hook for consuming user, session, and authentication state. Sources all data
 * from next-auth/react's `useSession` hook.
 *
 * https://next-auth.js.org/getting-started/client#usesession
 */
const useAuthentication = (
	options: UseAuthenticationOptions = {}
): UseAuthenticationResult => {
	const { flags } = useFlags()
	// Get option properties from `options` parameter
	const { isRequired = false, onUnauthenticated = () => signInWrapper() } =
		options

	// Pull data and status from next-auth's hook, and pass options
	const { data, status } = useSession({
		required: flags?.enableAuth && isRequired,
		onUnauthenticated,
	})

	// Logout user if token refresh fails
	useEffect(() => {
		if (data?.error === AuthErrors.RefreshAccessTokenError) {
			signOutWrapper()
		}
	}, [data?.error])

	// Deriving booleans about auth state
	const isAuthEnabled = flags?.enableAuth
	const isLoading = status === 'loading'
	const isAuthenticated = status === 'authenticated'
	const showAuthenticatedUI = isAuthenticated
	const showUnauthenticatedUI = isAuthEnabled && !isLoading && !isAuthenticated

	// Separating user and session data
	let session: SessionData, user: UserData
	if (isAuthenticated) {
		session = { ...data }
		user = data.user
		delete session.user

		const anonSegmentUserId = safeGetSegmentAnonymousId()
		const segmentUserId = safeGetSegmentId()

		// check if anonymousId exists. userId will be null until set in identify.
		if (anonSegmentUserId && segmentUserId !== session.id) {
			console.log('identify')
			analytics?.identify(
				session.id,
				{
					email: user.email,
					name: user.name,
					devPortalSignUp: true,
					createdAt: Date.now().toString(),
				},
				{
					// This limits PII flow to only Marketo as per Security and data engineering
					integrations: {
						All: false,
						'Marketo V2': true,
					},
				}
			)
		}
	}

	// Return everything packaged up in an object
	return {
		isAuthEnabled,
		isAuthenticated,
		isLoading,
		session,
		showAuthenticatedUI,
		showUnauthenticatedUI,
		signIn: signInWrapper,
		signOut: signOutWrapper,
		signUp,
		status,
		user,
	}
}

export default useAuthentication
