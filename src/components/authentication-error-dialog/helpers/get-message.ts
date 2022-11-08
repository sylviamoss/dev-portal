import { NextRouter } from 'next/router'

/**
 * Generates the `AuthenticationErrorDialog` body message based on the given
 * `routerPath`.
 */
const getMessage = (routerPath: NextRouter['asPath']) => {
	let message = 'Would you like to retry signing in?'

	if (routerPath === '/profile/bookmarks') {
		message +=
			' If you sign in,  you will be returned to this page. If you sign out, you will be returned to the home page.'
	} else {
		message += ' You will be returned to this page after either action.'
	}

	return message
}

export { getMessage }
