import Avatar from "./shared/Avatar";

const ChatMessage = (props) => {
  let caret;
  let messageBg;
  let rowType;
  let status;

  const { message, id, image, sentBy, dateSent, receiverStatus } = props;
  const date = new Date(dateSent);
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  if (sentBy === "logged_user") {
    caret = "right";
    messageBg = "bg-cyan-200";
    rowType = "flex-row-reverse";
    status = 1;
  } else {
    caret = "left";
    messageBg = "bg-slate-100";
    rowType = "";
    status = receiverStatus;
  }

  return (
    <div className={`w-full flex items-center ${rowType}`} key={id}>
      {/* Avatar Container */}
      <div className="w-[50px] m-3">
        <Avatar size="9" image={image} status={status} />
      </div>
      {/* Message Container */}
      <div className="relative">
        <div className={`flex ${rowType} item w-full `}>
          <div className={`triangle-${caret}`}></div>
          <div className={`${messageBg} m-0 p-5 mt-3 mb-0 rounded-lg`}>
            {message}
          </div>
        </div>
        <span className="mt-0">
          <i
            className={`text-xs float-${caret} ${
              caret === "right" ? "mr-5" : "ml-5"
            } font-light`}
          >
            {formattedDate}
          </i>
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
