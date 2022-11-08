import { useFlags } from 'flags/client'
import { getUserMeta } from 'lib/auth/user'
import DropdownDisclosure, {
	DropdownDisclosureDescriptionItem,
	DropdownDisclosureLabelItem,
	DropdownDisclosureSeparatorItem,
} from 'components/dropdown-disclosure'
import {
	UserDropdownDisclosureItem,
	UserDropdownDisclosureProps,
} from './types'
import { renderItem } from './helpers'
import { UserDropdownDebuggingItems } from './components'

/**
 * A DropdownDisclosure intended to be used as a menu with actions/links for
 * authenticated users.
 */
const UserDropdownDisclosure = ({
	className,
	items,
	listPosition,
	user,
}: UserDropdownDisclosureProps) => {
	const { icon, label, description } = getUserMeta(user)
	const { flags } = useFlags()
	const enableDebugging = !!flags?.showDebugUserMenuItems

	return (
		<DropdownDisclosure
			aria-label="User menu"
			className={className}
			icon={icon}
			listPosition={listPosition}
		>
			<DropdownDisclosureLabelItem>{label}</DropdownDisclosureLabelItem>
			<DropdownDisclosureDescriptionItem>
				{description}
			</DropdownDisclosureDescriptionItem>
			<DropdownDisclosureSeparatorItem />
			{items.map(renderItem)}
			{enableDebugging ? <UserDropdownDebuggingItems /> : null}
		</DropdownDisclosure>
	)
}

export type { UserDropdownDisclosureItem, UserDropdownDisclosureProps }
export default UserDropdownDisclosure
