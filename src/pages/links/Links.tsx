import { useSession } from "next-auth/react"
import React from "react"
import { Box, Text, HStack, Button, Stack } from "@chakra-ui/react"
import HouseLinks from "../../components/HouseLinks"

interface Link {
  id: string | number
  title: string
  link: string
}

const Links = () => {
  const { data: session } = useSession()

  const games: Link[] = [
    { id: 1, title: "kpart", link: "https://www.kparty.club/" },
    { id: 2, title: "Fast Quiz", link: "https://fast-quiz.vercel.app/" },
    {
      id: 3,
      title: "Code Breaker",
      link: "https://pdx-code-breaker.netlify.app/",
    },
    {
      id: 5,
      title: "Word Cracker",
      link: "https://word-cracker.vercel.app/",
    },
  ]

  return (
    <Stack padding={10} spacing="10">
      {session?.user?.isAdmin && <HouseLinks />}
      <Box>
        <Text as="h2" fontWeight={"black"}>
          Games
        </Text>
        <HStack>
          {games.map((game) => (
            <a key={game.id} href={game.link} target="_blank" rel="noreferrer">
              <Button>{game.title}</Button>
            </a>
          ))}
        </HStack>
      </Box>
    </Stack>
  )
}

export default Links