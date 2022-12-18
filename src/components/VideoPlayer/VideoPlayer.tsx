import { Box, Button, Center, Flex } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import ReactPlayer from "react-player"
import Router from "next/router"
import { SettingsIcon } from "@chakra-ui/icons"
import { VideoProps } from "../../lib/Types"

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
        <Flex height="90%" alignItems="end" paddingLeft={1}>
          <Button
            colorScheme="gray"
            onClick={() => Router.push(`/video/${id}`)}
          >
            <SettingsIcon w="2" h="2" />
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default VideoPlayer
