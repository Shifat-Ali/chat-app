import React, { useState } from "react";
import { Input, Box, useToast, Button } from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

const SearchList = ({ handleFunction }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please fill the search value.",
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Failed to load Search Result",
        description: error.message,
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box display={"flex"}>
        <Input
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Go</Button>
      </Box>

      <Box mt="2">
        {loading ? (
          <ChatLoading />
        ) : (
          searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleFunction(user)}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default SearchList;
