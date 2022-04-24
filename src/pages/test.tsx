import React from "react"
import { useSession, getSession } from "next-auth/react"
import { Session } from "next-auth"
import Link from "next/link"

type Props = {
  session: Session | null
}

const Test = (props: Props) => {
  const { data: session, status } = useSession()
  console.log("session", session, status)
  return (
    <div>
      <h1>Test page</h1>
      <div>status: {status}</div>
      {!session && (
        <>
          <p>You are not logged in</p>
        </>
      )}
      <Link href={"/"}>
        <a>
          <button>Back</button>
        </a>
      </Link>
    </div>
  )
}

export default Test
