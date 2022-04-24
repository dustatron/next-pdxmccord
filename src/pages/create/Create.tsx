import React from "react"
import NewVideoForm from "../../components/NewVideoForm"
import { Text } from "@chakra-ui/react"

type Props = {}

const Create = (props: Props) => {
  return (
    <>
      <Text
        as="h1"
        fontWeight={"black"}
        fontSize={"2xl"}
        paddingBottom={6}
        paddingTop={10}
      >
        Add Video
      </Text>
      <NewVideoForm />
    </>
  )
}

export default Create
