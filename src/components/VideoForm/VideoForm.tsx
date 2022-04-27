import React from "react"
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
  Checkbox,
} from "@chakra-ui/react"

type Props = {
  submitData: (data: React.SyntheticEvent | string) => void
  setTitle: (title: string) => void
  title: string
  setLink: (link: string) => void
  link: string
  setImage: (image: string) => void
  image: string
  setContent: (content: string) => void
  content: string
  isEdit?: boolean
  isPublished?: boolean
  setPublished?: (boolean) => void
  deleteVideo?: (id: string) => void
  videoId?: string
}

const VideoForm = ({
  submitData,
  setTitle,
  setLink,
  setImage,
  setContent,
  title,
  link,
  image,
  content,
  isEdit,
  isPublished,
  setPublished,
  deleteVideo,
  videoId,
}: Props) => {
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
        {isEdit && (
          <FormControl>
            <Checkbox
              isChecked={isPublished}
              onChange={(e) => setPublished(e.target.checked)}
            >
              Published
            </Checkbox>
          </FormControl>
        )}
        <Flex>
          <Button onClick={() => Router.push("/")}> Cancel </Button>
          {isEdit && (
            <Button onClick={() => deleteVideo(videoId)}> Delete Video </Button>
          )}
          <Spacer />
          <Button colorScheme="blue" disabled={!link && !title} type="submit">
            {isEdit ? "Update" : "Add Video"}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}

export default VideoForm
