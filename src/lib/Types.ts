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
  sortOrder: number
}

export interface LinkType {
  id: string | number
  title: string
  link: string
}
