import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { GetServerSideProps, GetStaticProps } from "next"
import prisma from "../lib/prisma"
import { VideoProps } from "../lib/Types"
import VideoPlayer from "../components/VideoPlayer"
import { Flex, Box, Stack, Button } from "@chakra-ui/react"

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

export default function Home(props) {
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

      <Flex gap="2">
        {props?.video?.map((vid) => (
          <Button
            key={vid.id}
            padding="5"
            width={60}
            onClick={() => setCurrentVideo(vid)}
            isActive={currentVideo?.id === vid.id}
          >
            {vid.title}
          </Button>
        ))}
      </Flex>
    </Stack>
  )
}
