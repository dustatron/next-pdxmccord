import {
  Box,
  Button,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import { GetServerSideProps } from "next"
import ReactPlayer from "react-player"
import Router from "next/router"
import VideoPlayer from "../../components/VideoPlayer"
import prisma from "../../lib/prisma"
import { useSession } from "next-auth/react"

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
      <Text as="h2" fontWeight={"black"} fontSize="xx-large">
        {title}
      </Text>
      <Stack
        direction="row"
        textAlign="center"
        justifyContent="space-between"
        alignContent="center"
      >
        <p>By {props?.author?.name || "Unknown author"}</p>
        {session?.user?.isAdmin && (
          <Button
            onClick={() => Router.push(`/editVideo/${props.id}`)}
            marginTop={4}
            colorScheme="yellow"
          >
            Edit
          </Button>
        )}
      </Stack>
      {!isSSR && <ReactPlayer url={props.link} width="100%" />}
      {!props.published && userHasValidSession && postBelongsToUser && (
        <Button onClick={() => publishVideo(props.id)}>Publish</Button>
      )}

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Author</Td>
              <Td>{props?.author?.name || "Unknown author"}</Td>
            </Tr>
            <Tr>
              <Td>Title</Td>
              <Td>{props.title}</Td>
            </Tr>
            <Tr>
              <Td>Published</Td>
              <Td>{props.published ? "True" : "False"}</Td>
            </Tr>
            <Tr>
              <Td>Sort order</Td>
              <Td>{props.sortOrder}</Td>
            </Tr>
            <Tr>
              <Td>Image Link</Td>
              <Td>{props.image}</Td>
            </Tr>
            <Tr>
              <Td>Content</Td>
              <Td>{props.content}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Video
