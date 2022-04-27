import React, { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import prisma from "../../lib/prisma"
import Router from "next/router"
import { useSession } from "next-auth/react"
import { Button, Text, Box } from "@chakra-ui/react"
import ReactPlayer from "react-player"

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
async function publishVideo(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  })
  await Router.push("/")
}

const Video = (props) => {
  const { data: session } = useSession()
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  const title = !props.published ? `${props.title} (Draft)` : props.title

  return (
    <Box>
      <Text as="h2" fontWeight={"black"}>
        {title}
      </Text>
      <p>By {props?.author?.name || "Unknown author"}</p>
      {!isSSR && <ReactPlayer url={props.link} />}
      {!props.published && userHasValidSession && postBelongsToUser && (
        <Button onClick={() => publishVideo(props.id)}>Publish</Button>
      )}

      {session?.user?.isAdmin && (
        <Button onClick={() => Router.push(`/editVideo/${props.id}`)}>
          Edit
        </Button>
      )}
    </Box>
  )
}

export default Video
