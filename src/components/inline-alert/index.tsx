import classNames from 'classnames'
import Text from 'components/text'
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
				{title && (
					<Text className={s.title} size={200} weight="semibold">
						{title}
					</Text>
				)}
				<Text className={s.description} size={200} weight="regular">
					{description}
				</Text>
				{actions && <div className={s.actions}>{actions}</div>}
			</div>
		</div>
	)
}
