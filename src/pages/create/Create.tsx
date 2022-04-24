import React, { useState } from "react"
import Router from "next/router"

type Props = {}

const Create = (props: Props) => {
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
    <div>
      <h1>Add Video</h1>
      <form onSubmit={submitData}>
        <h1>New Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <input
          autoFocus
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image"
          type="text"
          value={image}
        />
        <input
          autoFocus
          onChange={(e) => setLink(e.target.value)}
          placeholder="link"
          type="text"
          value={link}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input disabled={!link && !title} type="submit" value="Create" />
        <a className="back" href="#" onClick={() => Router.push("/")}>
          or Cancel
        </a>
      </form>
    </div>
  )
}

export default Create
