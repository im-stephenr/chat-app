import axios from "axios";
export const useGetMessages = async (convId) => {
  try {
    // get messages
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/chat-messages/get-conversation-messages/${convId}`
    );
    const messages = await response.data;
    return messages;
  } catch (err) {
    console.log("ERROR FETCHIG MESSAGES", err);
  }
};
