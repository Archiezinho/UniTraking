import { Html, Head, Main, NextScript } from 'next/document'
import { NavMenu } from './Componentes/MenuMobile.module.jsx';

export default function Document() {
  return (
    <Html lang="pt-br">
      <link href='httpsfonts.googleapis.comiconfamily=Material+Icons
      rel=stylesheet'/>
      <Head />
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}
