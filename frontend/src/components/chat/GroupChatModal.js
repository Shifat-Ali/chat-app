import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  Input,
  useDisclosure,
  useToast,
  Text,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import SearchList from "./SearchList";

const GroupChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState("");
  const toast = useToast();
  const { user, chats, setChats } = ChatState();
  const [memberList, setMemberList] = useState([]);

  const createGroup = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          users: JSON.stringify(memberList.map((u) => u._id)),
          name: groupName,
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat created",
        status: "success",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to Create Chat",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        display={"flex"}
        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
        leftIcon={<GrAdd />}
        colorScheme="teal"
      >
        New Group Chat
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {groupName ? groupName : <Text>Group Chat</Text>}
          </ModalHeader>
          <ModalCloseButton />
          <Box
            display={"flex"}
            marginLeft={2}
            paddingLeft={2}
            overflowX={"hidden"}
          >
            <Avatar
              m={1}
              size={"sm"}
              cursor={"pointer"}
              name={user.data.name}
              src={user.data.profilePhoto}
            />
            {memberList.map((inputUser) => (
              <Tooltip
                key={inputUser._id}
                label={inputUser.name}
                aria-label="A tooltip"
              >
                <Avatar
                  m={1}
                  size={"sm"}
                  cursor={"pointer"}
                  name={inputUser.name}
                  src={inputUser.profilePhoto}
                  onClick={() =>
                    setMemberList(
                      memberList.filter(
                        (member) => member._id !== inputUser._id
                      )
                    )
                  }
                />
              </Tooltip>
            ))}
          </Box>
          <ModalBody>
            <Box></Box>
            <Box display={"flex"}>
              <Input
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                mb={3}
              />
              <Button
                onClick={() => {
                  createGroup();
                }}
              >
                Create
              </Button>
            </Box>
            <SearchList
              handleFunction={(inputUser) =>
                memberList.find((addedUser) => addedUser._id === inputUser._id)
                  ? {}
                  : setMemberList(memberList.concat([inputUser]))
              }
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
