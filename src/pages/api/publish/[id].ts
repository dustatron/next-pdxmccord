import prisma from "../../../lib/prisma"

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id
  const post = await prisma.video.update({
    where: { id: postId },
    data: { published: true },
  })
  res.json(post)
}
