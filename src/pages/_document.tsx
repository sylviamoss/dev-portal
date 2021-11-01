import Document, { Html, Head, Main, NextScript } from 'next/document'
import HashiHead from '@hashicorp/react-head'

/**
 * TODO: update the lang attribute dynamically?
 * Language code reference: https://www.w3schools.com/tags/ref_language_codes.asp
 */

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <HashiHead />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            noModule
            dangerouslySetInnerHTML={{
              __html: `window.MSInputMethodContext && document.documentMode && document.write('<script src="/ie-custom-properties.js"><\\x2fscript>');`,
            }}
          />
        </body>
      </Html>
    )
  }
}
