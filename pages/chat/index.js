import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Chat = () => {
  const router = useRouter();
  const joinRoom = () => {
    router.push(`/chat/${Math.random().toString(36).slice(2)}`);
  };
  useEffect(() => {
    joinRoom();
  }, []);
};

export default Chat;


