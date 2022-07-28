import { UserData } from 'types/auth'
import {
	DropdownDisclosureButtonItemProps,
	DropdownDisclosureLinkItemProps,
} from 'components/dropdown-disclosure/components/list-item'

type UserDropdownDisclosureItem =
	| {
			icon: DropdownDisclosureLinkItemProps['icon']
			href: DropdownDisclosureLinkItemProps['href']
			label: DropdownDisclosureLinkItemProps['children']
			onClick?: never
	  }
	| {
			icon: DropdownDisclosureButtonItemProps['icon']
			href?: never
			label: DropdownDisclosureButtonItemProps['children']
			onClick: DropdownDisclosureButtonItemProps['onClick']
	  }

interface UserDropdownDisclosureProps {
	items: UserDropdownDisclosureItem[]
	user: UserData
}

export type { UserDropdownDisclosureItem, UserDropdownDisclosureProps }
