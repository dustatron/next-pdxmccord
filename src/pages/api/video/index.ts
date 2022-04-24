import { getSession } from "next-auth/react"
import prisma from "../../../lib/prisma"

// POST /api/video
// Required fields in body: title
// Required fields in body: image
// Required fields in body: link
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content, image, link } = req.body

  const session = await getSession({ req })
  const result = await prisma.video.create({
    data: {
      title: title,
      content: content,
      image: image,
      link: link,
      author: { connect: { email: session?.user?.email } },
    },
  })
  res.json(result)
}
