import React, { useState } from "react"
import Router from "next/router"
import VideoForm from "../VideoForm"
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
    <VideoForm
      content={content}
      image={image}
      link={link}
      title={title}
      setContent={setContent}
      setImage={setImage}
      setLink={setLink}
      setTitle={setTitle}
      submitData={submitData}
    />
  )
}

export default NewVideoForm
