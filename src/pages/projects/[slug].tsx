import fs from "fs"
import matter from "gray-matter"
import md from "markdown-it"
import Image from "next/image"
import { Text } from "@chakra-ui/react"

const projectPage = ({ frontmatter, content }) => {
  return (
    <div>
      <a href={frontmatter.link} target="_blank" rel="noreferrer">
        <Text as="h1" color="#4183C4">
          {frontmatter.title}
        </Text>
      </a>
      <hr />
      <p>{frontmatter?.brief}</p>
      <Image
        width={800}
        height={448}
        alt={frontmatter.title}
        src={`/${frontmatter.socialImage}`}
      />
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  )
}

export default projectPage

export async function getStaticPaths() {
  const files = fs.readdirSync("projects")
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`projects/${slug}.md`, "utf-8")
  const { data: frontmatter, content } = matter(fileName)
  return {
    props: {
      frontmatter,
      content,
    },
  }
}
