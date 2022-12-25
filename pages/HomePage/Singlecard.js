import { Box, Link } from "@chakra-ui/layout";
import React from "react";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";

const Singlecard = ({ elem }) => {
  const router = useRouter();
  function move(id) {
    // console.log(id);
    router.push(`/chat/${id}`);
  }
  return (
    <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline" ml="10%" mt={"3%"}>
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{elem?.category}</Heading>

          <Text py="2">{elem?.description}</Text>
          <Text>Task: {elem?.task}</Text>
          <br />
          <Text>Pay:${elem?.pay}</Text>
        </CardBody>

        <CardFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              move(elem?.employer);
            }}
          >
            Contact
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default Singlecard;
