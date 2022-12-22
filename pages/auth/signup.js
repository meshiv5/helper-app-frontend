import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import styles from "../../styles/Signup/signup.module.css";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const toast = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleClick = async () => {
    try {
      let res = await axios.post(`${process.env.server}/auth/signup`, details);
      if (res.data === "Account created") {
        toast({
          title: "Account created.",
          description: "Signup Successful.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
      router.push("/auth/login");
    } catch (e) {
      toast({
        title: "Error.",
        description: "User already exists.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex className={styles.main} minH={"100vh"} align={"center"} justify={"center"}>
      <Stack className={styles.signup} spacing={8} mx={"auto"} width={[400, 600, 600]} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            signup to seek help ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="name" onChange={handleChange} type="text" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input name="email" onChange={handleChange} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input name="password" onChange={handleChange} type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleClick}
                loadingText="Submitting"
                size="lg"
                bg={"gray"}
                color={"white"}
                _hover={{
                  bg: "black",
                }}
              >
                Sign up
              </Button>
              <Button bgColor={"red"} color={"white"} leftIcon={<BsGoogle />}>
                Google
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link style={{ color: "#1c7ed6" }} href="/auth/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
