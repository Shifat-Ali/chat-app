import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../../logic/ChatLogic";
import { ChatState } from "../../context/ChatProvider";
import { Tooltip, Avatar, Text } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((msg, i) => (
          <div style={{ display: "flex" }} key={msg._id}>
            {(isSameSender(messages, msg, i, user.data._id) ||
              isLastMessage(messages, i, user.data._id)) && (
              <Tooltip
                label={msg.sender.name}
                placement="bottom-start"
                aria-label="A tooltip"
              >
                <Avatar
                  mt={"7px"}
                  mr={1}
                  size={"sm"}
                  cursor={"pointer"}
                  name={msg.sender.name}
                  src={msg.sender.profilePhoto}
                />
              </Tooltip>
            )}

            <span
              style={{
                backgroundColor: `${
                  msg.sender._id === user.data._id ? "#bee3f8" : "#b9f5d0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidt: "75%",
                marginLeft:
                  msg.sender._id === user.data._id
                    ? "auto"
                    : isSameSender(messages, msg, i, user.data._id) ||
                      isLastMessage(messages, i, user.data._id)
                    ? 0
                    : 33,
                marginTop: isSameUser(messages, msg, i) ? 3 : 10,
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
