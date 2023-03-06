import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io.connect(import.meta.env.VITE_SOCKET_URL);
export const SocketContext = createContext();
