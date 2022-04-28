import React, { useEffect } from "react"
import NextLink from "next/link"
import { Prisma } from "@prisma/client"
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useSession, signIn, signOut } from "next-auth/react"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { data: session } = useSession()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    const color = window.localStorage.getItem("chakra-ui-color-mode")
    if (color === "dark") {
      toggleColorMode()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <NextLink href="/">
              <a>PDX McCord</a>
            </NextLink>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <NextLink href="/">
                <a>
                  <Button>Videos</Button>
                </a>
              </NextLink>
              <NextLink href="/links">
                <a>
                  <Button>Links</Button>
                </a>
              </NextLink>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {!session && <Button onClick={() => signIn()}>Sign In</Button>}
              {session && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={session.user.image} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={session.user.image} />
                    </Center>
                    <br />
                    <Center>
                      <p>{session.user.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    {session.user.isAdmin && (
                      <>
                        <NextLink href="/drafts">
                          <a>
                            <MenuItem>Your Drafts</MenuItem>
                          </a>
                        </NextLink>
                        <NextLink href="/create">
                          <a>
                            <MenuItem>Add Video</MenuItem>
                          </a>
                        </NextLink>
                      </>
                    )}
                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Header
