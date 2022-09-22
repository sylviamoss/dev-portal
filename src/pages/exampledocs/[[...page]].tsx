import DocsPage from '@hashicorp/react-docs-page'
import { getStaticGenerationFunctions } from '@hashicorp/react-docs-page/server'
import HcpCallout from 'components/dev-dot-content/mdx-components/mdx-hcp-callout'

//  Set up DocsPage settings
const BASE_ROUTE = 'exampledocs'
const NAV_DATA = 'src/data/example-docs-nav-data.json'
const CONTENT_DIR = 'src/content/exampledocs'

function DocsLayout(props) {
	return (
		<DocsPage
			baseRoute={BASE_ROUTE}
			product={{
				name: 'Packer',
				slug: 'packer',
			}}
			staticProps={props}
			additionalComponents={{ HcpCallout }}
			algoliaConfig={{
				indexName: 'product_HCP',
				searchOnlyApiKey: '1162c7d22059acafddb62badfdf68f35',
			}}
		/>
	)
}

const { getStaticPaths, getStaticProps: generatedGetStaticProps } =
	getStaticGenerationFunctions({
		strategy: 'fs',
		navDataFile: NAV_DATA,
		localContentDir: CONTENT_DIR,
		product: 'packer',
	})

const getStaticProps = async (context) => {
	console.log('getStaticProps')
	if (process.env.HASHI_ENV === 'production') {
		return { notFound: true }
	}

	const generatedProps = (await generatedGetStaticProps({
		...context,
	})) as $TSFixMe

	return generatedProps
}

export { getStaticPaths, getStaticProps }

export default DocsLayout
