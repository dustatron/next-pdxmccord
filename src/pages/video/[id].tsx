import React from "react"
import { GetServerSideProps } from "next"
import prisma from "../../lib/prisma"
import Router from "next/router"
import { useSession } from "next-auth/react"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const video = await prisma.video.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: video,
  }
}
async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  })
  await Router.push("/")
}

const Video = (props) => {
  const { data: session, status } = useSession()
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  const title = !props.published ? `${props.title} (Draft)` : props.title

  return (
    <div>
      <h2>{title}</h2>
      <p>By {props?.author?.name || "Unknown author"}</p>
      {!props.published && userHasValidSession && postBelongsToUser && (
        <button onClick={() => publishPost(props.id)}>Publish</button>
      )}
    </div>
  )
}

export default Video
