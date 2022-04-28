import React from "react"
import { Box, Text, HStack, VStack } from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"

type Props = {}
interface Link {
  id: string | number
  title: string
  link: string
  img: string
}
const HouseLinks = (props: Props) => {
  const links: Link[] = [
    {
      id: 1,
      link: "http://192.168.6.200:8080/cgi-bin/",
      title: "QNAP",
      img: "/qnap.png",
    },
    {
      id: 2,
      link: "http://192.168.6.179:8989/",
      title: "SONARR",
      img: "/sonarr.png",
    },
    {
      id: 3,
      link: "http://192.168.6.179:7878/",
      title: "RADARR",
      img: "/radarr.png",
    },
    {
      id: 4,
      link: "http://192.168.6.179:8080/",
      title: "SABNZB",
      img: "/sabnzb.png",
    },
    {
      id: 5,
      link: "https://192.168.6.200:14860/gui/",
      title: "Resilio Sync",
      img: "/resilio.png",
    },
  ]
  const IMG_SIZE = "150"
  return (
    <Box>
      <Text as="h2" fontWeight={"black"}>
        House Links
      </Text>
      <HStack spacing={6}>
        {links.map((link) => (
          <a key={link.id} href={link.link} target="_blank" rel="noreferrer">
            <VStack
              alignItems="center"
              border="1px"
              borderColor="gray.600"
              borderRadius={4}
              padding="1"
            >
              <Image
                src={link.img}
                alt={link.title}
                width={IMG_SIZE}
                height={IMG_SIZE}
              />
              <Text fontWeight="bold">{link.title}</Text>
            </VStack>
          </a>
        ))}
      </HStack>
    </Box>
  )
}

export default HouseLinks
