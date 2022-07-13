import hcpData from 'data/hcp.json'
import { ProductData } from 'types/products'
import ProductLandingView from 'views/product-landing'
import { generateGetStaticProps } from 'views/product-landing/server'

const getStaticProps = generateGetStaticProps(hcpData as ProductData)

export { getStaticProps }
export default ProductLandingView
