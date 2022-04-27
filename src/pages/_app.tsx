import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "../components/Layout"

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default App
