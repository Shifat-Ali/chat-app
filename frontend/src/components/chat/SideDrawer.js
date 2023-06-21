import React, { useRef, useState } from "react";
import {
  Stack,
  Button,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { FcSearch } from "react-icons/fc";
import { BiChevronDown, BiMessageDots } from "react-icons/bi";
import { ChatState } from "../../context/ChatProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SearchList from "./SearchList";

const SideDrawer = () => {
  const [loading, setLoading] = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const accessChat = async (inputUser) => {
    const id = inputUser._id;
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId: id }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setLoading(false);
      setSelectedChat(data);
      onClose();
    } catch (error) {
      toast({
        title: "Failed to load Chat",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"#1f1f1f"}
        p={"2px"}
      >
        <Stack direction={"row"}>
          <Button
            leftIcon={<FcSearch />}
            color={"white"}
            bgColor={"#1f1f1f"}
            ref={btnRef}
            onClick={onOpen}
          >
            Search
          </Button>
        </Stack>
        <Text color={"white"} paddingBlockStart={"2"}>
          ChatApp
        </Text>

        <div>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<BiMessageDots />}
              color={"white"}
              bgColor={"#1f1f1f"}
              paddingRight={"-2"}
            ></MenuButton>
            <MenuList>
              <MenuItem>unread message</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<BiChevronDown />}
              color={"white"}
              bgColor={"#1f1f1f"}
            >
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.data.name}
                color={"black"}
                bgColor={"#ffffff"}
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  logoutHandler();
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text> Search </Text>
          </DrawerHeader>

          <DrawerBody>
            <SearchList handleFunction={(user) => accessChat(user)} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
