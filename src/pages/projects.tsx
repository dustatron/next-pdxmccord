import { useSession } from "next-auth/react"
import React from "react"
import { Box, Text, VStack, Button, Stack, Heading } from "@chakra-ui/react"
import AdminLinks from "../components/AdminLinks"
import { LinkType } from "../lib/Types"
import fs from "fs"
import matter from "gray-matter"
import Image from "next/image"
import Link from "next/link"

const Projects = (props) => {
  const { data: session } = useSession()

  const games: LinkType[] = [
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
    <>
      <Stack padding={10} spacing="10">
        <Heading as="h2">Projects</Heading>
        {session?.user?.isAdmin && <AdminLinks />}

        <Box>
          <Text as="h2" fontWeight={"black"} fontSize="2xl">
            Games
          </Text>
          <VStack align="stretch" spacing={5}>
            {games.map((game) => (
              <a
                key={game.id}
                href={game.link}
                target="_blank"
                rel="noreferrer"
              >
                <Box width="100%">
                  <Button>{game.title}</Button>
                </Box>
              </a>
            ))}
          </VStack>
        </Box>
      </Stack>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
        {props.projects?.map(({ slug, frontmatter }) => (
          <div
            key={slug}
            className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <Link href={`/projects/${slug}`}>
              <a>
                <Image
                  width={650}
                  height={340}
                  alt={frontmatter.title}
                  src={`/${frontmatter.socialImage}`}
                />
                <h1 className="p-4">{frontmatter.title}</h1>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Projects

export async function getStaticProps() {
  const files = fs.readdirSync("projects")
  const projects = files.map((fileName) => {
    const slug = fileName.replace(".md", "")
    const readFile = fs.readFileSync(`projects/${fileName}`, "utf-8")
    const { data: frontmatter } = matter(readFile)
    return {
      slug,
      frontmatter,
    }
  })
  return {
    props: {
      projects,
    },
  }
}
