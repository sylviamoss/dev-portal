import DocsPage from '@hashicorp/react-docs-page'
import { getStaticGenerationFunctions } from '@hashicorp/react-docs-page/server'
import HcpCallout from 'components/dev-dot-content/mdx-components/mdx-hcp-callout'

//  Set up DocsPage settings
const BASE_ROUTE = 'example'
const NAV_DATA = 'src/data/example-docs-nav-data.json'
const CONTENT_DIR = 'src/content/example-docs'

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

const { getStaticPaths, getStaticProps } = getStaticGenerationFunctions({
	strategy: 'fs',
	navDataFile: NAV_DATA,
	localContentDir: CONTENT_DIR,
	product: 'packer',
})

export { getStaticPaths, getStaticProps }

export default DocsLayout

// const basePath = 'example-docs'
// const baseDir = 'example-content'
// const localContentDir = `${baseDir}/docs`
// const localPartialsDir = `${baseDir}/partials`
// const navDataFile = `${baseDir}/docs-nav-data.json`

// function DocsView(props) {
// 	return (
// 		<main>
// 			<DocsPage
// 				product={{ name: 'Cloud', slug: 'hashicorp' }}
// 				baseRoute={basePath}
// 				staticProps={props}
// 				showEditPage={false}
// 				showVersionSelect={false}
// additionalComponents={{ HcpCallout }}
// algoliaConfig={{
// 	indexName: 'product_HCP',
// 	searchOnlyApiKey: '1162c7d22059acafddb62badfdf68f35',
// }}
// 			/>
// 		</main>
// 	)
// }

// // const { getStaticPaths, getStaticProps } = getStaticGenerationFunctions({
// // 	strategy: 'fs',
// // 	localContentDir,
// // 	navDataFile,
// // 	product: 'cloud.hashicorp.com',
// // 	remarkPlugins: [
// // 		[
// // 			includeMarkdown,
// // 			{
// // 				resolveMdx: true,
// // 				resolveFrom: path.join(process.cwd(), localPartialsDir),
// // 			},
// // 		],
// // 		paragraphCustomAlerts,
// // 		typography,
// // 		anchorLinks,
// // 	],
// // 	rehypePlugins: [
// // 		[rehypePrism, { ignoreMissing: true }],
// // 		rehypeSurfaceCodeNewlines,
// // 	],
// // })
// const { getStaticPaths, getStaticProps } = getStaticGenerationFunctions({
// 	strategy: 'fs',
// 	localContentDir,
// 	navDataFile,
// 	localPartialsDir,
// 	product: 'consul',
// })

// export { getStaticPaths, getStaticProps }

// export default DocsView
