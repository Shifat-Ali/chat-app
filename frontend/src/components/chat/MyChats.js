import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useToast, Box, Button, Stack, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../logic/ChatLogic";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Failed to load Chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(user.data);
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir={"column"}
        alignItems={"center"}
        p={3}
        bgColor={"white"}
        w={{ base: "100%", md: "31%" }}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Box
          px={3}
          pb={3}
          fontSize={{ base: "28px", md: "30px" }}
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          My Chats
          <GroupChatModal />
        </Box>

        <Box
          display={"flex"}
          flexDir={"column"}
          p={3}
          w={"100%"}
          h={"100%"}
          borderRadius={"lg"}
          overflowY={"hidden"}
        >
          {chats ? (
            <Stack overflowY={"scroll"}>
              {chats.map((chat) => (
                <Box
                  onClick={() => {
                    setSelectedChat(chat);
                  }}
                  cursor={"pointer"}
                  bg={selectedChat === chat ? "#38b2ac" : "#e8e8e8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                  key={chat._id}
                >
                  <Text>
                    {chat.isGroupChat === false
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
