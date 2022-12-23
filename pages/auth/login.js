import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import styles from "../../styles/Login/login.module.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SimpleCard() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleClick = async () => {
    try {
      let res = await axios.post(`${process.env.server}/auth/login`, details);
      if (res.data.message === "Login success") {
        localStorage.setItem("helperApp", res.data.token);
        toast({
          title: "Success.",
          description: "Login Successful.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
      router.push("/HomePage/HomePage");
    } catch (e) {
      toast({
        title: "Error.",
        description: "Wrong Credemtials.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex className={styles.main} minH={"100vh"} align={"center"} justify={"center"}>
      <Stack className={styles.login} spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input name="email" onChange={handleChange} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input name="password" onChange={handleChange} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                <Checkbox>Remember me</Checkbox>
                <Link href="/ForgotPassword" color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={handleClick}
                bg={"gray"}
                color={"white"}
                _hover={{
                  bg: "black",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account?{" "}
                <Link style={{ color: "#1c7ed6" }} href="/auth/signup">
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
