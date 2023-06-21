import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import ChatBox from "../components/chat/ChatBox";
import MyChats from "../components/chat/MyChats";
import SideDrawer from "../components/chat/SideDrawer";
import { useState } from "react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(true);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box w="100%" h="100%" display={"flex"} justifyContent={"space-between"}>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
