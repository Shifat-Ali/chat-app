import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  Box,
  Avatar,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { ChatState } from "../../context/ChatProvider";
import SearchList from "./SearchList";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [groupName, setGroupName] = useState("");

  const handleRemove = () => {};
  const handleRename = () => {};
  const handleAdd = () => {};

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<CgProfile />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"center"}>
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display={"flex"}
              marginLeft={2}
              paddingLeft={2}
              justifyContent={"center"}
              overflowX={"hidden"}
            >
              <Avatar
                m={1}
                size={"sm"}
                cursor={"pointer"}
                name={user.data.name}
                src={user.data.profilePhoto}
              />

              {selectedChat.users.map((inputUser) => (
                <Menu key={inputUser._id}>
                  <MenuButton>
                    <Tooltip label={inputUser.name} aria-label="A tooltip">
                      <Avatar
                        m={1}
                        size={"sm"}
                        cursor={"pointer"}
                        name={inputUser.name}
                        src={inputUser.profilePhoto}
                      />
                    </Tooltip>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        handleRemove();
                      }}
                    >
                      Remove
                    </MenuItem>
                  </MenuList>
                </Menu>
              ))}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Chat Name"
                value={groupName}
                mt={2}
                mb={2}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button onClick={handleRename}>Update</Button>
            </FormControl>
            <SearchList
              handleFunction={(user) => {
                handleAdd(user);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
