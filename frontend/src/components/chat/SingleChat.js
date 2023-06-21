import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { getSender } from "../../logic/ChatLogic";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, SetFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
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
        Message Here
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
