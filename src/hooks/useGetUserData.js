import axios from "axios";
import React from "react";

export const useGetUSerData = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/users/${userId}`
    );

    return response;
  } catch (err) {
    console.log("ERROR FETCHING USER DATA", err);
  }
};
