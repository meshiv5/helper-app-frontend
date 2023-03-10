import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  // Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  LinkBox,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../redux/authReducer/auth.actionTypes";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [useridentity, setUserIdentity] = useState("Buyer");
  const dispatch = useDispatch();
  const router = useRouter();
  function UserToggle() {
    if (useridentity == "Buyer") {
      setUserIdentity("Seller");
      localStorage.setItem("mode", "Seller");
    } else {
      setUserIdentity("Buyer");
      localStorage.setItem("mode", "Buyer");
      router.push("/");
    }
  }
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    router.push("/auth/login");
  };
  useEffect(() => {
    if (!localStorage.getItem("mode")) localStorage.setItem("mode", "Buyer");
    else setUserIdentity(localStorage.getItem("mode"));
  }, []);
  if (router.pathname === "/auth/login" || router.pathname === "/auth/signup" || router.pathname === "/ForgotPassword") {
    return <></>;
  }
  return (
    <div style={{ position: "sticky", top: "0px", zIndex: "1000" }}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link href={"/"}>Logo</Link>
            </Box>
          </HStack>
          <Flex alignItems={"center"}>
            <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4} onClick={UserToggle}>
              {useridentity}
            </Button>
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>{/* <MenuItem>from post to service</MenuItem> */}</MenuItem>
                <MenuItem>Wallet</MenuItem>
                <MenuItem>Messages</MenuItem>
                {useridentity == "Seller" && (
                  <div>
                    <Link href="/serviceform">
                      <MenuItem w={"100%"}>Post Services</MenuItem>
                    </Link>
                    <Link href="/Seller/SellerProducts">
                      <MenuItem>Services</MenuItem>
                    </Link>
                  </div>
                )}
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>{"Logout"}</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  );
}
