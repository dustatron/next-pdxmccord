interface Link {
  id: string | number
  title: string
  link: string
  img: string
}
export const links: Link[] = [
  {
    id: 1,
    link: "http://192.168.6.200:8080/cgi-bin/",
    title: "QNAP",
    img: "/qnap.png",
  },
  {
    id: 2,
    link: "http://192.168.6.179:8989/",
    title: "TV",
    img: "/sonarr.png",
  },
  {
    id: 3,
    link: "http://192.168.6.179:7878/",
    title: "Movies",
    img: "/radarr.png",
  },
  {
    id: 4,
    link: "http://192.168.6.179:8080/",
    title: "Downloadwer",
    img: "/sabnzb.png",
  },
  {
    id: 5,
    link: "https://192.168.6.200:14860/gui/",
    title: "Resilio",
    img: "/resilio.png",
  },
]
