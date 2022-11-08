import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { saveAndLoadAnalytics } from '@hashicorp/react-consent-manager'
import { preferencesSavedAndLoaded } from '@hashicorp/react-consent-manager/util/cookies'
import { SessionData, UserData, ValidAuthProviderId } from 'types/auth'
import { useFlags } from 'flags/client'
import { useDebuggingState } from 'contexts/debugging-state'
import { UseAuthenticationOptions, UseAuthenticationResult } from './types'
import { makeSignIn, makeSignOut, signUp } from './helpers'

/**
 * Constants.
 *
 * Notes:
 *  - `DEBUGGING_ERROR_PROPERTY_NAME` is used to effectively namespace a
 *    property that this hooks reads from the debugging state. Namespacing
 *    properties should help prevent unrelated parts of the app from using the
 *    same properties.
 */
export const DEBUGGING_ERROR_PROPERTY_NAME = 'emulatedUseAuthenticationError'
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
	const { state: debuggingState } = useDebuggingState()

	// Get router path for `signIn` and `signOut` `callbackUrl`s
	const router = useRouter()

	// Set up memoized `signIn` and `signOut` callbacks
	const signIn = useMemo(
		() => makeSignIn({ routerPath: router.asPath }),
		[router.asPath]
	)
	const signOut = useMemo(
		() => makeSignOut({ routerPath: router.asPath }),
		[router.asPath]
	)

	// Get option properties from `options` parameter
	const { isRequired = false, onUnauthenticated = () => signIn() } = options

	// Pull data and status from next-auth's hook, and pass options
	const { data, status } = useSession({
		required: isRequired,
		onUnauthenticated,
	})

	// Deriving booleans about auth state
	const isLoading = status === 'loading'
	const isAuthenticated = status === 'authenticated'
	const showAuthenticatedUI = isAuthenticated
	const showUnauthenticatedUI = !isLoading && !isAuthenticated
	const preferencesLoaded = preferencesSavedAndLoaded()

	/**
	 * If the `showDebugUserMenuItems` feature flag is enabled, then we `hasError`
	 * is determined by whether or not the app's debugging state has an error in
	 * it. Otherwise, we check whether for an error in the session `data` object.
	 */
	const enableDebugging = !!flags?.showDebugUserMenuItems
	const hasError = enableDebugging
		? debuggingState && debuggingState[DEBUGGING_ERROR_PROPERTY_NAME]
		: data && data.error

	// We accept consent manager on the user's behalf. As per Legal & Compliance,
	// signing-in means a user is accepting our privacy policy and so we can
	// enable tracking. Should only be ran if not already set & loaded.
	useEffect(() => {
		if (isAuthenticated && !preferencesLoaded) {
			saveAndLoadAnalytics({ loadAll: true })
		}
	}, [isAuthenticated, preferencesLoaded])

	// Separating user and session data
	let session: SessionData, user: UserData
	if (isAuthenticated) {
		session = { ...data }
		user = data.user
		delete session.user
	}

	// Return everything packaged up in an object
	return {
		hasError,
		isAuthenticated,
		isLoading,
		session,
		showAuthenticatedUI,
		showUnauthenticatedUI,
		signIn,
		signOut,
		signUp,
		status,
		user,
	}
}

export default useAuthentication
