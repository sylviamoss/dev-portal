import isAbsoluteUrl from 'lib/is-absolute-url'
import {
	DropdownDisclosureLinkItem,
	DropdownDisclosureButtonItem,
} from 'components/dropdown-disclosure'
import { UserDropdownDisclosureItem } from '../types'

/**
 * Handles rendering either a link item or a button item based on whether the
 * `href` or `onClick` property is given.
 */
const renderItem = (
	{ href, icon, label, onClick }: UserDropdownDisclosureItem,
	itemIndex: number
) => {
	if (href) {
		const isExternal = isAbsoluteUrl(href)
		const rel = isExternal ? 'noreferrer noopener' : undefined
		const target = isExternal ? '_blank' : undefined

		return (
			<DropdownDisclosureLinkItem
				key={itemIndex}
				href={href}
				icon={icon}
				rel={rel}
				target={target}
			>
				{label}
			</DropdownDisclosureLinkItem>
		)
	}

	if (onClick) {
		return (
			<DropdownDisclosureButtonItem
				key={itemIndex}
				icon={icon}
				onClick={onClick}
			>
				{label}
			</DropdownDisclosureButtonItem>
		)
	}
}

export { renderItem }
