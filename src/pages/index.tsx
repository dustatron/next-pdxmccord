import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { GetServerSideProps, GetStaticProps } from "next"
import prisma from "../lib/prisma"
import { VideoProps } from "../lib/Types"
import VideoPlayer from "../components/VideoPlayer"
import { Flex, Box, Stack, Button } from "@chakra-ui/react"
import VideoWrapper from "../components/VideoWrapper"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const videos = await prisma.video.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: { videos },
  }
}
interface Props {
  videos: VideoProps[]
}

export default function Home({ videos }: Props) {
  return <VideoWrapper videos={videos} />
}
