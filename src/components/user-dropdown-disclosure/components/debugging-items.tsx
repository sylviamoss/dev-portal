import { IconAlertCircle16 } from '@hashicorp/flight-icons/svg-react/alert-circle-16'
import { useDebuggingState } from 'contexts'
import useAuthentication, {
	DEBUGGING_ERROR_PROPERTY_NAME,
} from 'hooks/use-authentication'
import {
	DropdownDisclosureButtonItem,
	DropdownDisclosureLabelItem,
	DropdownDisclosureSeparatorItem,
} from 'components/dropdown-disclosure'

/**
 * A special portion of the `UserDropdownDisclosure` that is intended to only
 * render if the `showDebugUserMenuItems` feature flag is enabled. The purpose
 * is to add custom items that can be used to trigger the app to change state.
 *
 * For example, an authentication error is tedious and challenging
 * to organically reproduce. With this component, we can render an item that
 * emulates an error so we can test how the app handles the error.
 */
const UserDropdownDebuggingItems = () => {
	const { hasError } = useAuthentication()
	const { setState: setDebuggingState } = useDebuggingState()

	return (
		<>
			<DropdownDisclosureLabelItem>Debugging</DropdownDisclosureLabelItem>
			<DropdownDisclosureSeparatorItem />
			<DropdownDisclosureButtonItem
				icon={<IconAlertCircle16 />}
				onClick={() => {
					setDebuggingState((prevState) => {
						return {
							...prevState,
							[DEBUGGING_ERROR_PROPERTY_NAME]: prevState.hasError
								? undefined
								: 'TEST ERROR',
						}
					})
				}}
			>
				{hasError ? 'Do not emulate auth error' : 'Emulate auth error'}
			</DropdownDisclosureButtonItem>
		</>
	)
}

export { UserDropdownDebuggingItems }
