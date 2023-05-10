import { Html, Head, Main, NextScript } from 'next/document'
import {i18n} from "next-i18next";

export default function Document() {
  return (
    <Html lang={i18n?.language} dir={i18n?.dir()}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
