import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../assets/components/Navbar";
import Sidebar from "../assets/components/Sidebar";
import Main from "../assets/components/Main";
import { AuthContext } from "../assets/components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../assets/components/context/SocketContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useGetUSerData } from "../hooks/useGetUserData";
import { useGetMessages } from "../hooks/useGetMessages";

const ChatUi = (props) => {
  const [userData, setUserData] = useState(null);
  const [messagesData, setMessagesData] = useState([]);
  const { authData, activeUsers } = useContext(AuthContext);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [conversationId, setConversationId] = useState(null);
  const chatTextArea = useRef(null);

  // Handle Clicking Inbox/Friend Message
  const handleInboxMessageClick = async (friendId) => {
    setUserData(await useGetUSerData(friendId));
    // Check table conversation if friend's ID and current logged in ID exist, if not then create new Conversation ID
    // if Conversation ID exist, get messages from chat_message table
    // if Conversation does NOT exist, insert into conversations table with authors id and friends ID
    try {
      // check conversation, select from conversations
      const getConversation = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/conversations/get/${friendId}/${authData._id}`
      );

      if (!getConversation.data.length) {
        try {
          // save conversation
          const saveConversation = await axios.post(
            `${import.meta.env.VITE_APP_BACKEND_URL}/conversations/new`,
            {
              members: [friendId, authData._id],
              conversationId: uuidv4(),
            }
          );
          setConversationId(saveConversation.data.conversationId);
          setMessagesData(
            await useGetMessages(saveConversation.data.conversationId)
          );
        } catch (err) {
          console.log("ERROR SAVING CONVERSATION", err);
        }
      } else {
        // fetch messages directly since conversation id already exist
        setConversationId(getConversation.data[0].conversationId);
        setMessagesData(
          await useGetMessages(getConversation.data[0].conversationId)
        );
      }
    } catch (err) {
      console.log("ERROR FETCHING CONVERSATION", err);
      setConversationId(null);
    }
  };

  // Handle Submitting Message
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (chatTextArea.current.value !== "") {
      const message_data = {
        conversationId: conversationId,
        sender_id: authData._id, // user who currently logged in
        receiver_id: userData.data._id,
        message: chatTextArea.current.value,
        room: import.meta.env.VITE_ROOM,
      };

      // Save sent message to the backend
      try {
        const saveMessage = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/chat-messages/save-message`,
          message_data
        );
        // Call socket on backend
        await socket.emit("send_message", message_data);

        setMessagesData([...messagesData, saveMessage.data]);
      } catch (err) {
        console.log("ERROR SAVING MESSAGE TO DB", err);
      }
    }

    chatTextArea.current.value = ""; // clear textarea
  };

  // Useeffect for socket io receiving message
  useEffect(() => {
    // checkUserExist();
    socket.on("receive_message", (data) => {
      setMessagesData([...messagesData, data]);
    });
  }, [socket, messagesData]);

  // Useeffect for login check
  useEffect(() => {
    if (authData === null) {
      navigate("/login");
    }
  }, [authData]);

  return (
    <>
      <div className="relative min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar onInboxMessageClick={handleInboxMessageClick} />
          <Main
            userRelevantData={userData}
            onSubmitMessage={handleSubmitMessage}
            fetchedMessagesData={messagesData}
            chatTextArea={chatTextArea}
          />
        </div>
      </div>
    </>
  );
};

export default ChatUi;
