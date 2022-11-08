import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DatadogHeadTag, DatadogScriptTag } from 'lib/datadog'
import { makeWelcomeToast } from 'lib/make-welcome-notification'
import { MobileMenuProvider } from 'contexts'
import AuthenticationErrorDialog from 'components/authentication-error-dialog'
import TabProvider from 'components/tabs/provider'
import { CoreDevDotLayoutProps } from './types'
import s from './core-dev-dot-layout.module.css'

const CoreDevDotLayout = ({ children }: CoreDevDotLayoutProps) => {
	const { asPath, pathname, isReady } = useRouter()

	const isSwingset = asPath.startsWith('/swingset')
	const isToastPath = pathname !== '/' && pathname !== '/_error' && !isSwingset

	useEffect(() => {
		if (isReady && isToastPath) {
			makeWelcomeToast()
		}
	}, [isReady, isToastPath])

	return (
		<>
			<MobileMenuProvider>
				<TabProvider>
					<Head>
						<DatadogHeadTag />
					</Head>
					<div className={s.root}>{children}</div>
					{isSwingset ? null : <DatadogScriptTag />}
				</TabProvider>
			</MobileMenuProvider>
			<AuthenticationErrorDialog />
		</>
	)
}

export default CoreDevDotLayout
