import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import Layout from "../components/Layout"
function App({ Component, pageProps: { session, ...pageProps } }) {
  const theme = extendTheme({
    styles: {
      global: {
        h1: {
          fontWeight: "600",
          lineHeight: "110%",
          fontSize: "5rem",
          paddingTop: "4",
          paddingBottom: "4",
        },
        h2: {
          fontWeight: "500",
          lineHeight: "110%",
          fontSize: "2rem",
          paddingTop: "2",
          paddingBottom: "4",
        },
        p: {
          paddingLeft: "3",
        },
      },
    },
  })
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
