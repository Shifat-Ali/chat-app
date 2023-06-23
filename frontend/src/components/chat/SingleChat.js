import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { getSender } from "../../logic/ChatLogic";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, SetFetchAgain }) => {
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "/api/message/",
          {
            chatId: selectedChat._id,
            content: newMessage,
          },
          config
        );

        console.log(data);

        setMessages(messages.concat([data]));
      } catch (error) {
        toast({
          title: "Failed to send message",
          description: error.response.data.message,
          status: "error",
          duration: 3000,
          position: "bottom-left",
          isClosable: true,
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const fetchAllMessages = async () => {
    if (!selectedChat) return;
    console.log(selectedChat._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      console.log(data);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    console.log("effect");
    fetchAllMessages();
  }, [selectedChat]);

  return selectedChat ? (
    <>
      <Text
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w={"100%"}
        display={"flex"}
        justifyContent={{ base: "space-between" }}
        alignItems={"center"}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<BiArrowBack />}
          onClick={() => setSelectedChat("")}
        />
        {selectedChat.isGroupChat ? (
          <>
            {selectedChat.chatName.toUpperCase()}
            <UpdateGroupChatModal
              fetchAgain={fetchAgain}
              setFetchAgain={SetFetchAgain}
            />
          </>
        ) : (
          <>{getSender(user.data, selectedChat.users).toUpperCase()}</>
        )}
      </Text>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"flex-end"}
        p={3}
        bg={"#e8e8e8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {loading ? (
          <Spinner
            size={"xl"}
            w={20}
            h={20}
            alignSelf={"center"}
            margin={"auto"}
          />
        ) : (
          <div>
            {""}
            <ScrollableChat messages={messages} />
            {""}
          </div>
        )}

        <FormControl onKeyDown={sendMessage} isRequired mt={2}>
          <Input
            placeholder="Enter the message..."
            onChange={typingHandler}
            bgColor={"white"}
            value={newMessage}
          />
        </FormControl>
      </Box>
    </>
  ) : (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100%"}
    >
      <Text fontSize={"3xl"} pb={3}>
        Click on a user to start chatting
      </Text>
    </Box>
  );
};

export default SingleChat;
