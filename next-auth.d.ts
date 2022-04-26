declare global {
  interface User {
    isAdmin: boolean
    image: string
    name: string
    email: sting
  }

  module "next-auth" {
    interface Session {
      user: User
    }
  }
}
