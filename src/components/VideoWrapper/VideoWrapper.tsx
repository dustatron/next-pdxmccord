import { useEffect, useState } from "react"
import { Flex, Button, Stack } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { VideoProps } from "../../lib/Types"
import VideoPlayer from "../VideoPlayer"

interface Props {
  videos: VideoProps[]
}

export default function VideoWrapper({ videos }: Props) {
  const { data: session } = useSession()
  const [currentVideo, setCurrentVideo] = useState<VideoProps>()
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  useEffect(() => {
    if (videos && !currentVideo) {
      setCurrentVideo(videos[0])
    }
  }, [session, videos, currentVideo])

  const videoList = videos.sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <Stack>
      {!isSSR && videos.length > 0 && <VideoPlayer videoData={currentVideo} />}
      <Flex
        gap="2"
        flexWrap={"wrap"}
        alignItems="center"
        justifyContent="center"
      >
        {videoList?.map((vid) => (
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
