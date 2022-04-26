import prisma from "../../../lib/prisma"

// DELETE or Post /api/video/:id
export default async function handle(req, res) {
  const postId = req.query.id
  if (req.method === "DELETE") {
    const post = await prisma.video.delete({
      where: { id: postId },
    })
    res.json(post)
  } else if (req.method === "POST") {
    const { title, content, image, link } = req.body
    const videoId = req.query.id
    const video = await prisma.video.update({
      where: { id: videoId },
      data: {
        title: title,
        content: content,
        image: image,
        link: link,
      },
    })
    res.json(video)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
