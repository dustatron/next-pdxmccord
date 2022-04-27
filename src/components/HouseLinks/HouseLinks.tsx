import React from "react"
import { Box, Text, HStack, Button } from "@chakra-ui/react"
import Link from "next/link"
type Props = {}
interface Link {
  id: string | number
  title: string
  link: string
}
const HouseLinks = (props: Props) => {
  const links: Link[] = [
    {
      id: 1,
      link: "http://192.168.6.200:8080/cgi-bin/",
      title: "QNAP Dashboard",
    },
    {
      id: 2,
      link: "http://192.168.6.179:8989/",
      title: "SONARR",
    },
    {
      id: 3,
      link: "http://192.168.6.179:7878/",
      title: "RADARR",
    },
    {
      id: 4,
      link: "http://192.168.6.179:8080/",
      title: "SABNZB",
    },
    {
      id: 5,
      link: "https://192.168.6.200:14860/gui/",
      title: "Resilio Sync",
    },
  ]
  return (
    <Box>
      <Text as="h2" fontWeight={"black"}>
        House Links
      </Text>
      <HStack>
        {links.map((link) => (
          <a key={link.id} href={link.link} target="_blank" rel="noreferrer">
            {" "}
            <Button>{link.title}</Button>
          </a>
        ))}
      </HStack>
    </Box>
  )
}

export default HouseLinks
