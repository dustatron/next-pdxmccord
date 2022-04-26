import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import prisma from "../lib/prisma"
import { VideoProps } from "../lib/Types"
import VideoPlayer from "../components/VideoPlayer"
import { Flex, Box, Stack } from "@chakra-ui/react"
import Video from "./video/[id]"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const video = await prisma.video.findMany({
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
    props: { video },
  }
}
interface Props {
  video: VideoProps[]
}

export default function Home(props: Props) {
  const { data: session } = useSession()
  const [currentVideo, setCurrentVideo] = useState<VideoProps>()
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  useEffect(() => {
    if ((props.video, !currentVideo)) {
      setCurrentVideo(props.video[0])
    }
  }, [session, props.video, currentVideo])

  return (
    <Stack marginTop="5">
      <Box>
        {!isSSR && props.video.length > 0 && (
          <VideoPlayer videoData={currentVideo} />
        )}
      </Box>

      <Flex>
        {props?.video?.map((vid) => (
          <Box
            key={vid.id}
            border={"1px"}
            margin={3}
            padding="3"
            borderColor={"blackAlpha.300"}
            borderRadius="5px"
            onClick={() => setCurrentVideo(vid)}
          >
            {vid.title}
          </Box>
        ))}
      </Flex>
    </Stack>
  )
}
