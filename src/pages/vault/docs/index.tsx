import vaultData from 'data/vault.json'
import { ProductData } from 'types/products'
import SidebarSidecarLayout from 'layouts/sidebar-sidecar'
import ProductRootDocsPathLanding from 'views/product-root-docs-path-landing'
import { generateGetStaticProps } from 'views/product-root-docs-path-landing/server'
import pageContent from './content.json'

const VaultDocsLanding = () => {
  return <ProductRootDocsPathLanding pageContent={pageContent} />
}

const getStaticProps = generateGetStaticProps({
  baseName: 'Docs',
  basePath: 'docs',
  product: vaultData as ProductData,
})

VaultDocsLanding.layout = SidebarSidecarLayout
export { getStaticProps }
export default VaultDocsLanding
