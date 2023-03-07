import React from "react";

const Avatar = (props) => {
  return (
    <div className={`relative w-${props.size} h-${props.size} `}>
      <img
        className={`rounded-full ring-2 ring-gray-100 w-${props.size} h-${props.size}`}
        src={`https://drive.google.com/uc?export=view&id=${
          props.image ? props.image : "1RLekGHcNI7cVbRVyVNFi7RfSk5P_rTJA"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring ring-white ${
          props.status === 1 ? "bg-green-600" : "bg-gray-600"
        }`}
      ></div>
    </div>
  );
};

export default Avatar;
