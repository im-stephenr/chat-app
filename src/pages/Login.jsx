import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveUser } from "../hooks/useSaveUser";
import { AuthContext } from "../assets/components/context/AuthContext";
import { SocketContext } from "../assets/components/context/SocketContext";

const Login = (props) => {
  const catImage = useRef(null);
  const [loginName, setLoginName] = useState("");
  const [alertWarning, setAlertWarning] = useState({
    type: "",
    message: "",
    color: "",
  });
  const { authData, dispatch } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) {
      navigate("/");
    }
  }, []);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginName === "") {
      // Login Failed
      resetStateData(false);
      setAlertWarning({
        type: "warning",
        message: "Name is required",
        color: "red",
      });
    } else {
      const saveUser = await useSaveUser(loginName);
      // If response success
      if (saveUser.status === 200) {
        // if response has error
        if (saveUser.data.error) {
          resetStateData(false);
          setAlertWarning({
            type: "warning",
            message: saveUser.data.message,
            color: "red",
          });
        } else {
          // Login Successfull
          // Save local storage
          localStorage.setItem("user", JSON.stringify(saveUser.data));
          // Save to Context
          dispatch({ type: "LOGIN", payload: saveUser.data });
          // Send Socket Data to Backend and Join to specific socket ROOM
          socket.emit("join_room", import.meta.env.VITE_ROOM); // super unique room, a unique identifier for a room
          // Add new user to socket active user list
          socket.emit("new_user_add", saveUser.data._id);
          navigate("/");
        }
      } else {
        console.log("LOGIN ERROR");
      }
    }
  };
  // Handle input login
  const handleLoginNameInput = (e) => {
    setLoginName(e.target.value);
  };
  // Handle input focus
  const handleLoginNameFocus = (e) => {
    resetStateData(true);
  };

  // Reset state Data
  const resetStateData = (reset) => {
    /**
     * Google drive image id
     * Welcome cat = 1mdvQQ5VUVFHOyuiX84Lw3n2VxKO4IBfy
     * Angry cat = 1KiCTN5AqFA1cRnazTM5V1V9rKtJsKdTj
     */
    if (reset) {
      catImage.current.src =
        "https://drive.google.com/uc?export=view&id=1mdvQQ5VUVFHOyuiX84Lw3n2VxKO4IBfy";
      setAlertWarning({ type: "", message: "", color: "" });
    } else {
      catImage.current.src =
        "https://drive.google.com/uc?export=view&id=1KiCTN5AqFA1cRnazTM5V1V9rKtJsKdTj";
    }
  };
  return (
    <>
      <div className="container mx-auto">
        {/* Image */}
        <div className="relative">
          <img
            src="https://drive.google.com/uc?export=view&id=1mdvQQ5VUVFHOyuiX84Lw3n2VxKO4IBfy"
            className={`max-w-xs h-auto mx-auto ${
              alertWarning && alertWarning.type === "warning" && "mt-[104px]"
            }`}
            alt="Cat Welcoming You"
            ref={catImage}
          />
        </div>
        {/* Form */}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className="px-10 relative min-w-[40%]">
              <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  onInput={handleLoginNameInput}
                  onFocus={handleLoginNameFocus}
                  form="loginForm"
                  className="block appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Enter your name"
                  aria-label="Full name"
                  autoFocus
                  autoComplete="off"
                />
                <button
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                  form="loginForm"
                >
                  Proceed
                </button>
              </div>
              {alertWarning && alertWarning.message !== "" && (
                <p className="text-red-500 text-xs italic block">
                  {alertWarning.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
