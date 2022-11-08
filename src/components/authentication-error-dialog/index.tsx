import { useRouter } from 'next/router'
import useAuthentication from 'hooks/use-authentication'
import Button from 'components/button'
import Dialog from 'components/dialog'
import Heading from 'components/heading'
import Text from 'components/text'
import { getMessage } from './helpers'
import s from './authentication-error-dialog.module.css'

const AuthenticationErrorDialog = () => {
	const { asPath } = useRouter()
	const { hasError, signIn, signOut } = useAuthentication()

	return (
		<Dialog
			isDismissable={false}
			isOpen={hasError}
			label="Authentication error"
		>
			<Heading className={s.title} level={2} size={300} weight="semibold">
				There was an authentication error while you were away.
			</Heading>
			<Text asElement="p">{getMessage(asPath)}</Text>
			<div className={s.buttonsContainer}>
				<Button text="Yes, sign me in" onClick={() => signIn()} />
				<Button
					text="No, sign me out"
					color="critical"
					onClick={() => signOut()}
				/>
			</div>
		</Dialog>
	)
}

export default AuthenticationErrorDialog
