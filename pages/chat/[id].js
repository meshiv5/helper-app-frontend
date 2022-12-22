import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "../../components/chat/Header";
import Footer from "../../components/chat/Footer";
import Messages from "../../components/chat/Messages";

export default function SingleRoom({ sender }) {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const { id: roomName } = router.query;

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher(process.env.key, {
      cluster: process.env.cluster,
    });
    const channel = pusher.subscribe(roomName);
    channel.bind("chat-event", function (data) {
      setChats((prevState) => [...prevState, { from: data.sender, message: data.message }]);
    });
    return () => {
      pusher.unsubscribe(roomName);
    };
  }, []);

  const handleSendButton = async (e) => {
    e.preventDefault();
    await axios.post("/api/pusher", { channel: roomName, message: messageToSend, sender });
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w="40%" h="90%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={chats} />
        <Divider />
        <Footer inputMessage={messageToSend} setInputMessage={setMessageToSend} handleSendMessage={handleSendButton} />
      </Flex>
    </Flex>
  );
}

export function getServerSideProps() {
  return {
    props: {
      sender: "me",
    },
  };
}
