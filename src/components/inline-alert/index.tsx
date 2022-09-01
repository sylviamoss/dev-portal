import classNames from 'classnames'
import { InlineAlertProps } from './types'
import s from './inline-alert.module.css'

export default function InlineAlert({
	className,
	color = 'neutral',
	icon,
	title,
	description,
	actions,
}: InlineAlertProps) {
	return (
		<div className={classNames(s.root, s[color], className)}>
			{icon && <div className={s.icon}>{icon}</div>}
			<div className={s.contentContainer}>
				{title ? <p className={s.title}>{title}</p> : null}
				<p className={s.description}>{description}</p>
				{actions && <div className={s.actions}>{actions}</div>}
			</div>
		</div>
	)
}
