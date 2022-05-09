import React from "react"
import { Text, HStack } from "@chakra-ui/react"
import { links } from "./linkList"

type Props = {}

const AdminLinks = (props: Props) => {
  return (
    <HStack
      spacing={3}
      justifyContent="left"
      background="gray.600"
      height="2rem"
      marginBottom="3"
      paddingLeft="3"
    >
      {links.map((link) => (
        <a key={link.id} href={link.link} target="_blank" rel="noreferrer">
          <HStack borderRadius={5}>
            <Text color="white">{link.title}</Text>
          </HStack>
        </a>
      ))}
    </HStack>
  )
}

export default AdminLinks
