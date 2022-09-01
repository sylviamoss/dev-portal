import { ReactNode } from 'react'

export interface InlineAlertProps {
	/**
	 * Optional className
	 */
	className?: string
	/** Sets the color scheme */
	color?: 'neutral' | 'highlight' | 'success' | 'warning' | 'critical'
	/**
	 * Optional icon rendered next to alert title.
	 */
	icon?: ReactNode
	/**
	 * Alert title
	 */
	title?: string
	/**
	 * Alert description
	 */
	description: string
	/**
	 * Optional alert CTAs
	 */
	actions?: ReactNode
}
