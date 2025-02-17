import { CertificationsSectionProps } from './components/certifications-section/types'
import { HeroProps } from './components/hero/types'
import { HcpSlotProps } from './components/merchandising-slots/slots/hcp-slot/types'
import { VaultSlotProps } from './components/merchandising-slots/slots/vault-slot/types'
import { PreFooterProps } from './components/pre-footer/types'
import { HomePageAuthoredContent } from './content-schema'

interface HomePageContentProps {
	hero: Omit<HeroProps, 'description'> & { description: string }
	navNotice: string
	certificationsSection: CertificationsSectionProps
	merchandising: {
		vault: VaultSlotProps
		hcp: HcpSlotProps
	}
	preFooter: PreFooterProps
}

interface HomePageProps {
	content: HomePageContentProps
}

export type { HomePageAuthoredContent, HomePageContentProps, HomePageProps }
