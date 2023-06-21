import React from "react";
import { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@chakra-ui/react";
import Login from "../components/Authentication/login";
import SignUp from "../components/Authentication/SignUp";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="96" centerContent>
      <Text
        fontSize={"2xl"}
        fontWeight={"hairline"}
        paddingBlockEnd={3}
        paddingBlockStart={3}
      >
        Chat App
      </Text>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth={"1px"}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Sign Up</Tab>
            <Tab>Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignUp />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
