import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "../../components/chat/Header";
import Footer from "../../components/chat/Footer";
import Messages from "../../components/chat/Messages";
import jwt from "jsonwebtoken";
import { io } from "socket.io-client";
let socket;
let sender;
let roomID;
export default function SingleRoom() {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [receiver, setReceiver] = useState({ name: "" });

  const socketInitializer = () => {
    socket = io(process.env.server);
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.emit("join-room", roomID + sender?.id, sender?.id + roomID);
    console.log("joined Rooms ", roomID + sender?.id, sender?.id + roomID);
    socket.on("receive-msg", (msg, senderEmail, receiverEmail) => {
      setChats((oldChats) => [...oldChats, { from: senderEmail, to: receiverEmail, message: msg }]);
    });
  };
  useEffect(() => {
    const userData = jwt.decode(localStorage.getItem("helperApp"));
    sender = userData;
    const windowURL = window.location.href;
    roomID = windowURL.split("/")[windowURL.split("/").length - 1];
    getOtherUserData(localStorage.getItem("helperApp"), roomID).then((data) => {
      data
        .json()
        .then((res) => {
          console.log("my details :- " + JSON.stringify(sender));
          if (res.status == false) router.push("/");
          else setReceiver({ ...res.data });
        })
        .catch((err) => {
          router.push("/");
        });
    });

    getMessages(localStorage.getItem("helperApp"), roomID + sender?.id).then((data) => {
      data.json().then((result) => {
        setChats((oldChats) => [...oldChats, ...result.data.messages]);
      });
    });
    socketInitializer();
    return () => socket.disconnect();
  }, []);

  const handleSendButton = async (e) => {
    socket.emit("send-msg", messageToSend, sender.email, receiver.email, roomID + sender.id, sender.id + roomID);
    setChats((oldChats) => [...oldChats, { from: sender.email, to: receiver.id, message: messageToSend }]);
    setMessageToSend("");
  };

  return (
    <Flex w="100%" h="88vh" justify="center" align="center" mt={10}>
      <Flex w={["90%", "90%", "90%", "96%"]} h="100%" flexDir="column">
        <Header name={receiver.name} isOnline={true} />
        <Divider />
        <Messages messages={chats} sender={sender} />
        <Divider />
        <Footer inputMessage={messageToSend} setInputMessage={setMessageToSend} handleSendMessage={handleSendButton} />
      </Flex>
    </Flex>
  );
}

function getOtherUserData(token, id) {
  return fetch(`http://localhost:8000/getOtherData/${id}`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
}

function getMessages(token, roomID) {
  return fetch(`http://localhost:8000/getMessages/${roomID}`, {
    method: "GET",
    headers: {
      authorization: token,
    },
  });
}
