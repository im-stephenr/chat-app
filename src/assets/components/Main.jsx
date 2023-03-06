import React, { useContext, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatMessage from "./ChatMessage";
import { AuthContext } from "./context/AuthContext";
import Input from "./Input";
import Avatar from "./shared/Avatar";
const Main = (props) => {
  const { userRelevantData, fetchedMessagesData, socket, chatTextArea } = props;
  const { authData, activeUsers } = useContext(AuthContext);

  return (
    <main className="w-full min-h-[300px] h-[calc(100vh-60px)] relative">
      {/* Current Message User Info */}
      <div className="w-full border-b border-gray-300 flex items-center p-8 shadow-bottom ">
        {/* Avatar */}
        {userRelevantData && userRelevantData !== null && (
          <>
            <Avatar
              size="9"
              image={userRelevantData.data.avatar}
              status={activeUsers?.includes(userRelevantData.data._id) ? 1 : 0}
            />
            <h4 className="ml-3 text-xl">{userRelevantData.data.userName}</h4>
          </>
        )}
      </div>
      {/* Main container for Messages */}
      <div className="w-full relative min-h-[100px] h-[calc(100%-200px)]">
        {/* Container for all messages */}
        <ScrollToBottom
          className="flex flex-col-reverse  h-full p-3 "
          initialScrollBehavior="smooth"
        >
          {authData &&
            userRelevantData &&
            fetchedMessagesData &&
            fetchedMessagesData.map((key, index) => {
              return (
                <ChatMessage
                  key={index}
                  id={key._id}
                  sentBy={
                    key.sender_id === authData._id ? "logged_user" : "receiver"
                  }
                  image={
                    key.sender_id === authData._id
                      ? authData.avatar
                      : userRelevantData.data.avatar
                  }
                  message={key.message}
                  dateSent={key.date_sent}
                  receiverStatus={
                    activeUsers?.includes(userRelevantData.data._id) ? 1 : 0
                  }
                />
              );
            })}
        </ScrollToBottom>
      </div>
      {/* Input Message */}
      <div className="w-full min-h-[100px] absolute bottom-0 border-t-2 bg-gray-50 dark:bg-gray-700 ">
        {userRelevantData && (
          <Input
            onSubmit={props.onSubmitMessage}
            userRelevantData={userRelevantData}
            onInputChange={props.onInputChange}
            socket={socket}
            chatTextArea={chatTextArea}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
