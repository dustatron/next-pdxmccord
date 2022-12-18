import React, { useEffect, useState } from "react"

import { GetServerSideProps } from "next"
import Router from "next/router"
import { Text } from "@chakra-ui/react"
import VideoForm from "../../components/VideoForm"
import prisma from "../../lib/prisma"

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
  sortOrder: string
}

const EditVideo = (props: Props) => {
  const [title, setTitle] = useState(props.title)
  const [link, setLink] = useState(props.link)
  const [image, setImage] = useState(props.image)
  const [content, setContent] = useState(props.content)
  const [published, setPublished] = useState(props.published)
  const [sort, setSort] = useState(props.sortOrder)

  async function submitEdit(e): Promise<void> {
    e.preventDefault()
    const body = {
      title,
      link,
      image,
      content,
      published,
      sortOrder: Number(sort),
    }
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
        fontSize={"xx-large"}
        paddingBottom={6}
        paddingTop={2}
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
        sort={sort}
        setSort={setSort}
      />
    </>
  )
}

export default EditVideo
