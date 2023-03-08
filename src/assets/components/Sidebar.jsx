import React, { useContext, useEffect, useState } from "react";
import Avatar from "./shared/Avatar";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

const Sidebar = (props) => {
  const [usersList, setUsersList] = useState([]);
  const { authData, activeUsers } = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const getUsers = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/users`
        );
        if (!getUsers.data.error) {
          setUsersList(getUsers.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [authData]);

  return (
    <>
      <nav className="w-60 flex-none ">
        <div className="flex justify-center">
          <ul className="bg-white  border border-gray-200 w-96 text-gray-900 min-h-[300px] h-[calc(100vh-60px)]">
            {authData &&
              usersList &&
              usersList.length > 0 &&
              usersList
                .filter((user) => user._id !== authData._id)
                .map((key, index) => {
                  return (
                    <li
                      key={key._id}
                      className="flex items-center px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                      onClick={() => props.onInboxMessageClick(key._id)}
                    >
                      {/* Avatar */}
                      <Avatar
                        size="9"
                        image={key.avatar}
                        status={
                          activeUsers && activeUsers.includes(key._id) ? 1 : 0
                        }
                      />
                      {/* Name */}
                      <span className="ml-3">{key.userName}</span>
                    </li>
                  );
                })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
