export type VideoProps = {
  id: string
  title: string
  image: string
  link: string
  author: {
    name: string
    email: string
  } | null
  content: string
  published: boolean
}
