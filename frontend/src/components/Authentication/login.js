import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  var history = useHistory();

  const submit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        Headers: {
          "Content-type": "application/json",
        },
      };

      const data = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Succesfully Logged In",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <FormControl isRequired id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width={"100%"}
        bgColor={"facebook.200"}
        onClick={submit}
        style={{ marginBlockStart: 20 }}
      >
        Login
      </Button>

      <Button
        width={"100%"}
        bgColor={"grey.100"}
        onClick={submit}
        style={{ marginBlockStart: 20 }}
        isLoading={loading}
      >
        Join as Guest User
      </Button>
    </div>
  );
};

export default Login;
