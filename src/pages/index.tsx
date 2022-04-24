import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()
  console.log("session", session)

  return (
    <div className={styles.container}>
      <Head>
        <title>PDX McCord</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>PDX McCord</h1>
      {session && (
        <>
          <div>
            <Image
              src={session.user.image}
              alt="profile picture"
              width={100}
              height={100}
            />
          </div>
          <div>Signed in as {session.user.name}</div>
          <div>{session.user.email}</div>
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      <div>
        <Link href="/test">
          <a> test</a>
        </Link>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}