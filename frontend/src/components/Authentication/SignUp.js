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

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const postDetails = (profilePhoto) => {};

  const submit = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Account not created.",
        description: "Please Fill all the Fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Account not created.",
        description: "Password do not match.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }

    try {
      const config = {
        Headerss: {
          "Content-type": "application/json",
        },
      };

      const data = await axios.post(
        "/api/user",
        { name, email, password },
        config
      );

      toast({
        title: "Account created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
      return;
    } catch (error) {
      toast({
        title: "Error",
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
      <FormControl isRequired id="name">
        <FormLabel>name</FormLabel>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
      <FormControl id="ConfirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={confirmShow ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              h="1.75"
              size="sm"
              onClick={() => setConfirmShow(!confirmShow)}
            >
              {confirmShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Profile Photo</FormLabel>
        <Input
          type="file"
          p={1}
          accept="image/"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        width={"100%"}
        bgColor={"facebook.200"}
        onClick={submit}
        style={{ marginBlockStart: 15 }}
        isLoading={loading}
      >
        SignUp
      </Button>
    </div>
  );
};

export default SignUp;
