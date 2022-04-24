import React from "react"
import Footer from "../Footer"
import Header from "../Header"
import { Container } from "@chakra-ui/react"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW="2xl">{children}</Container>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
