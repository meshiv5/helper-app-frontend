import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const Header = ({ name, isOnline }) => {
  return (
    <Flex w="100%" mb={5}>
      <Avatar size="lg" name={name} src="https://bit.ly/dan-abramov">
        <AvatarBadge boxSize="1.25em" bg={isOnline ? "green.500" : "red.500"} />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        <Text color={isOnline ? "green.500" : "red.500"}>{isOnline ? "Online" : "Offline"}</Text>
      </Flex>
    </Flex>
  );
};

export default Header;
