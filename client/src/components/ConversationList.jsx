// Import necessary libraries and hooks
import { useEffect } from "react";
import { formatDistanceToNow } from "../utils/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, selectConversation } from "../store/slices/conversationSlice";
import { useTheme } from "../context/ThemeContext";

function ConversationList({ activeUsers }) {
  // Fetch user and conversation state from Redux store
  const userData = useSelector((state) => state.authSlice.user);
  const { conversation, selectedConversation, messages } = useSelector((state) => state.conversationSlice);

  const dispatch = useDispatch();
  const { theme } = useTheme(); // Access theme from context

  // Fetch conversations whenever messages are updated
  useEffect(() => {
    dispatch(fetchConversations());
  }, [messages, dispatch]);

  // Handle selecting a conversation
  const handleSelect = (item) => {
    if (item?.conversationID !== selectedConversation?.conversationID) {
      dispatch(selectConversation(item));
    }
  };

  // Show message if there are no conversations
  if (!conversation || conversation.length === 0) {
    return (
      <div className={`empty-conversations ${theme === "dark" ? "dark-mode" : ""}`}>
        <p>No conversations yet</p>
        <p>Start a new conversation using the button above</p>
      </div>
    );
  }

  return (
    <div className={`conversation-list ${theme === "dark" ? "dark-mode" : ""}`}>
      {/* Map through conversations and display each one */}
      {conversation.map((item) => {
        const isSender = item.creator._id === userData._id;
        const target = isSender ? item.participent : item.creator;
        const avatar = target.avatar ? target.avatar : target.fullName.charAt(0).toUpperCase();
        const lastMessage = item.lastMessage ? item.lastMessage.content : null;

        return (
          <div
            key={item._id}
            onClick={() => handleSelect({ ...target, conversationID: item._id })}
            className={`conversation-item ${theme === "dark" ? "dark-mode" : ""} 
              ${activeUsers.includes(target._id) && "active"} 
              ${selectedConversation?.conversationID === item._id ? "selected" : ""}`}
          >
            <div className="avatar">
              <img src={avatar} alt={target.fullName} />
            </div>

            <div className="conversation-details">
              <div className="conversation-header">
                <h3>{target.fullName}</h3>
                {item.lastMessage && (
                  <span className="time">
                    {formatDistanceToNow(item.lastMessage.updatedAt)}
                  </span>
                )}
              </div>

              {lastMessage && <p className="last-message">{lastMessage}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ConversationList;
