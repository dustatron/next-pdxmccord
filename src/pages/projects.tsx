import { useSession } from "next-auth/react"
import React from "react"
import { Box, Stack, Heading } from "@chakra-ui/react"
import fs from "fs"
import matter from "gray-matter"
import Image from "next/image"
import Link from "next/link"

const Projects = (props) => {
  const { data: session } = useSession()

  return (
    <>
      <Heading as="h2">Projects</Heading>
      <Stack direction="row" padding={3}>
        {props.projects?.map(({ slug, frontmatter }) => (
          <Box
            border="1px"
            padding="5"
            borderRadius={5}
            key={slug}
            className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <Link href={`/projects/${slug}`}>
              <a>
                <h3>{frontmatter.title}</h3>
                <Image
                  width={200}
                  height={112}
                  alt={frontmatter.title}
                  src={`/${frontmatter.socialImage}`}
                />
              </a>
            </Link>
          </Box>
        ))}
      </Stack>
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
