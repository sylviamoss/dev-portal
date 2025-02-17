import CardLink from 'components/card-link'
import { CardDescription, CardTitle } from 'components/card/components'
import CardsGridList from 'components/cards-grid-list'
import { LinkedCard, LinkedCardsProps } from './types'

function LinkedCards({ cards }: LinkedCardsProps) {
	return (
		<CardsGridList>
			{cards.map((card: LinkedCard) => {
				return (
					<CardLink key={card.url} ariaLabel={card.heading} href={card.url}>
						<CardTitle text={card.heading} />
						<CardDescription text={card.body} />
					</CardLink>
				)
			})}
		</CardsGridList>
	)
}

export type { LinkedCardsProps }
export { LinkedCards }
