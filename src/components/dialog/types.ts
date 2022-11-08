export interface DialogProps {
	ariaDescribedBy?: string
	children: React.ReactNode
	contentClassName?: string
	isDismissable?: boolean
	isOpen: boolean
	label: string
	onDismiss?(): void
	variant?: 'modal' | 'bottom'
}
