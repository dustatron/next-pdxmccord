import React, { useState, useEffect } from "react"
import { VideoProps } from "../../lib/Types"
import Router from "next/router"
import ReactPlayer from "react-player"
import { Button, Box, Spacer, Flex } from "@chakra-ui/react"
type Props = {
  videoData: VideoProps
}

const VideoPlayer = ({ videoData }: Props) => {
  const { author, content, id, image, link, published, title } = videoData
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    <Box
      border="1px"
      borderRadius={4}
      borderColor={"gray.400"}
      background="gray.200"
    >
      {!isSSR && <ReactPlayer url={link} width={"100%"} height="500px" />}
      <Flex>
        <Spacer />
        <Button
          marginTop={3}
          colorScheme="blackAlpha"
          onClick={() => Router.push(`/video/${id}`)}
        >
          More Details
        </Button>
      </Flex>
    </Box>
  )
}

export default VideoPlayer
