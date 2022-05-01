import React, { useState, useEffect } from "react"
import { VideoProps } from "../../lib/Types"
import Router from "next/router"
import ReactPlayer from "react-player"
import { Button, Box, Spacer, Flex, Center } from "@chakra-ui/react"
type Props = {
  videoData: VideoProps
  hideDetailBtn?: boolean
}

const VideoPlayer = ({ videoData, hideDetailBtn }: Props) => {
  const { author, content, id, image, link, published, title } = videoData
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    <Flex
      borderRadius={4}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      height="33rem"
    >
      {!isSSR && (
        <Center width="100%" background={"black"} height="90%">
          <ReactPlayer url={link} height="100%" width="80%" />
        </Center>
      )}
      {!hideDetailBtn && (
        <Button
          colorScheme="facebook"
          onClick={() => Router.push(`/video/${id}`)}
        >
          Movie Details
        </Button>
      )}
    </Flex>
  )
}

export default VideoPlayer
