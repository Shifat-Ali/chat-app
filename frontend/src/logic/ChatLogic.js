export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const isSameSender = (messages, msg, i, userId) => {
  if (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== msg.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  ) {
    return true;
  } else return false;
};

export const isLastMessage = (messages, i, userId) => {
  if (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  ) {
    return true;
  } else return false;
};

export const isSameUser = (messages, msg, i) => {
  if (i > 0 && messages[i - 1].sender._id === msg.sender._id) {
    return true;
  } else {
    return false;
  }
};
