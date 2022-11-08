import { IconAlertCircle16 } from '@hashicorp/flight-icons/svg-react/alert-circle-16'
import { useDebuggingState } from 'contexts'
import useAuthentication from 'hooks/use-authentication'
import {
	DropdownDisclosureButtonItem,
	DropdownDisclosureLabelItem,
	DropdownDisclosureSeparatorItem,
} from 'components/dropdown-disclosure'

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
							error: hasError ? 'TEST ERROR' : undefined,
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
