import fs from "fs"
import matter from "gray-matter"
import md from "markdown-it"

const projectPage = ({ frontmatter, content }) => {
  return (
    <div>
      <h1>{frontmatter.title}</h1>
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
