import { useSession } from "next-auth/react"
import React from "react"
import { Box, Text, VStack, Button, Stack } from "@chakra-ui/react"
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
    {
      id: 6,
      title: "Master Mine Close",
      link: "https://gallant-dijkstra-379443.netlify.app/",
    },
    {
      id: 7,
      title: "Treasure Sweep",
      link: "https://treasuresweepgame.herokuapp.com/",
    },
  ]

  return (
    <Stack padding={10} spacing="10">
      {session?.user?.isAdmin && <HouseLinks />}
      <Box>
        <Text as="h2" fontWeight={"black"} fontSize="2xl">
          Games
        </Text>
        <VStack align="stretch" spacing={5}>
          {games.map((game) => (
            <a key={game.id} href={game.link} target="_blank" rel="noreferrer">
              <Box width="100%">
                <Button>{game.title}</Button>
              </Box>
            </a>
          ))}
        </VStack>
      </Box>
    </Stack>
  )
}

export default Links
