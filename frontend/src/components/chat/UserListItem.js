import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      paddingBottom={"2"}
      display={"flex"}
      cursor={"pointer"}
      alignItems={"center"}
      color={"black"}
      bgColor={"#ebe8e4"}
      _hover={{
        background: "teal",
        color: "white",
      }}
      px={3}
      py={2}
      mt={2}
      borderRadius={"lg"}
    >
      <Avatar
        size={"sm"}
        cursor={"pointer"}
        name={user.name}
        src={user.profilePhoto}
      />
      <Box paddingLeft={2} alignContent={"end"}>
        <Text>{user.name}</Text>
        <div style={{ display: "flex" }}>
          <Text fontWeight={"bold"}> Email: </Text>
          <Text px={2}> {user.email}</Text>
        </div>
      </Box>
    </Box>
  );
};

export default UserListItem;
