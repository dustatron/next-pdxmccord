import React from "react"
import { GetServerSideProps } from "next"
import { useSession, getSession } from "next-auth/react"
import prisma from "../lib/prisma"
import Link from "next/link"
import { VideoProps } from "../lib/Types"
import ReactPlayer from "react-player"
import { Button, Heading } from "@chakra-ui/react"
import Router from "next/router"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const drafts = await prisma.video.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { drafts },
  }
}

type Props = {
  drafts: VideoProps[]
}

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession()

  const handlePublish = async (id) => {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    })
    Router.push("/")
  }

  if (!session) {
    return (
      <div>
        <Heading>My Video Drafts</Heading>
        <p>You need to be authenticated to view this page.</p>
      </div>
    )
  }

  return (
    <>
      <div className="page">
        <Heading>My Video Drafts</Heading>
        <main>
          {props.drafts.map((video) => (
            <div key={video.id} className="post">
              <Link href={`/video/${video.id}`}>
                <a>
                  <Button>Details</Button>
                </a>
              </Link>
              <Button onClick={() => handlePublish(video.id)}>Publish</Button>
              <ReactPlayer url={video.link} />
            </div>
          ))}
          {props.drafts.length === 0 && (
            <div>
              <p>No Drafts</p>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Drafts
