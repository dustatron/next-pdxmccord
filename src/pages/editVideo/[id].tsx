import React, { useState, useEffect } from "react"
import VideoForm from "../../components/VideoForm"
import { Text } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import prisma from "../../lib/prisma"
import Router from "next/router"

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

type Props = {
  author: {
    email: string
    name: string
  }
  authorId: string
  content: string
  id: string
  image: string
  link: string
  published: boolean
  title: string
}

const EditVideo = (props: Props) => {
  const [title, setTitle] = useState(props.title)
  const [link, setLink] = useState(props.link)
  const [image, setImage] = useState(props.image)
  const [content, setContent] = useState(props.content)
  const [published, setPublished] = useState(props.published)

  async function submitEdit(e): Promise<void> {
    e.preventDefault()
    const body = { title, link, image, content, published }
    await fetch(`/api/video/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    await Router.push(`/video/${props.id}`)
  }

  async function deleteVideo(id: string): Promise<void> {
    await fetch(`/api/video/${id}`, {
      method: "DELETE",
    })
    Router.push("/")
  }

  return (
    <>
      <Text
        as="h1"
        fontWeight={"black"}
        fontSize={"2xl"}
        paddingBottom={6}
        paddingTop={10}
      >
        Edit Video
      </Text>
      <VideoForm
        content={content}
        image={image}
        link={link}
        title={title}
        setContent={setContent}
        setImage={setImage}
        setLink={setLink}
        setTitle={setTitle}
        submitData={submitEdit}
        isEdit
        isPublished={published}
        setPublished={setPublished}
        deleteVideo={deleteVideo}
        videoId={props.id}
      />
    </>
  )
}

export default EditVideo
