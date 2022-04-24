import React from "react"
import Image from "next/image"
import Link from "next/link"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
      <Link href="/">
        <a>PDX McCord</a>
      </Link>
    </footer>
  )
}

export default Footer
