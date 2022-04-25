import React from "react"
import { GetServerSideProps } from "next"
import { useSession, getSession } from "next-auth/react"
import prisma from "../lib/prisma"
import Router from "next/router"
import Link from "next/link"
import { VideoProps } from "../lib/Types"

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

  if (!session) {
    return (
      <div>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </div>
    )
  }

  const handlePublish = async (id) => {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    })
    await Router.push("/")
  }

  return (
    <>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((video) => (
            <div key={video.id} className="post">
              <Link href={`/video/${video.id}`}>
                <a>{video.title}</a>
              </Link>
            </div>
          ))}
        </main>
      </div>
    </>
  )
}

export default Drafts
