import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import ChatUi from "./pages/ChatUi";
import Login from "./pages/Login";
import { AuthContextProvider } from "./assets/components/context/AuthContext";
import {
  SocketContext,
  socket,
} from "./assets/components/context/SocketContext";

function App() {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ChatUi />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </SocketContext.Provider>
    </>
  );
}

export default App;
