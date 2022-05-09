import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import Layout from "../components/Layout"
import customTheme from "../lib/theme"

function App({ Component, pageProps: { session, ...pageProps } }) {
  const theme = extendTheme(customTheme)
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default App
