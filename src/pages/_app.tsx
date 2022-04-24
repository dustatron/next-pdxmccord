import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import Layout from "../components/Layout"
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
