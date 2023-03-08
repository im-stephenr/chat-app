import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        authData: action.payload,
      };
    case "LOGOUT":
      return {
        authData: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, { authData: null });
  const socket = useContext(SocketContext);
  const [activeUsers, setActiveUsers] = useState({});

  useEffect(() => {
    const stored_data = JSON.parse(localStorage.getItem("user"));
    // if there's a data under localstorage then add it to our Context
    if (stored_data) {
      dispatch({ type: "LOGIN", payload: stored_data });
      /**
       * Send Socket Data to Backend and Join to specific socket ROOM
       * When Page is refreshed, automatically join the room*/
      // socket.emit("join_room", import.meta.env.VITE_ROOM); // super unique room, a unique identifier for a room
      // Add new user to socket active user list
      socket.emit("new_user_add", stored_data._id);
      // get active users from backend socket
      socket.on("get_active_users", (users) => {
        // extract the user id from array of objects and put it in a new array
        console.log("GETTING ACTIVE USERS FROM SOCKET", users);
        const userIds = users.map((obj) => obj.userId);
        setActiveUsers(userIds);
      });
    } else {
      dispatch({ type: "LOGOUT" });
      console.log("LOGGED OUT");
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ ...authState, dispatch, activeUsers }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
