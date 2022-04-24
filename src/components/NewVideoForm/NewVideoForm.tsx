import React, { useState } from "react"
import Router from "next/router"
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Spacer,
  Stack,
} from "@chakra-ui/react"
type Props = {}

const NewVideoForm = (props: Props) => {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("")

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content, image, link }
      await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      await Router.push("/drafts")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form onSubmit={submitData}>
      <Stack spacing={6}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Link</FormLabel>
          <Input
            autoFocus
            onChange={(e) => setLink(e.target.value)}
            placeholder="link"
            type="text"
            value={link}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Image Link</FormLabel>
          <Input
            autoFocus
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image"
            type="text"
            value={image}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descriptions</FormLabel>
          <Textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
        </FormControl>
        <Flex>
          <Button onClick={() => Router.push("/")}> Cancel </Button>
          <Spacer />
          <Button colorScheme="blue" disabled={!link && !title} type="submit">
            Add Video
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}

export default NewVideoForm
