// Import necessary libraries and hooks
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../utils/dateUtils";
import { useEffect, useRef, useState } from "react";
import { fetchMessages, selectConversation, sendMessage } from "../store/slices/conversationSlice";
import { useTheme } from "../context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ChatBox() {
  // Access theme and toggle function from the context
  const { theme, toggleTheme } = useTheme();
  
  // References and states
  const chatContainer = useRef(null);
  const [content, setContent] = useState("");
  
  // Dispatch function for Redux
  const dispatch = useDispatch();
  
  // Fetch the selected conversation and messages from Redux state
  const { selectedConversation, messages } = useSelector((state) => state.conversationSlice);
  const user = useSelector((state) => state.authSlice.user);

  // Fetch messages when a new conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      dispatch(fetchMessages(selectedConversation.conversationID));
    }
  }, [selectedConversation, dispatch]);

  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    const container = chatContainer.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(sendMessage({ content, reciverId: selectedConversation._id, conversationId: selectedConversation.conversationID }));
      setContent(""); // Clear the input after sending the message
    }
  };

  return (
    <div className={`chat-box ${selectedConversation ? "active" : ""}`}>
      {/* Chat header */}
      <div className={`chat-header ${theme === "dark" ? "dark-mode" : ""}`}>
        <button className="back-button" onClick={() => dispatch(selectConversation(null))}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        
        {/* User info */}
        <div className="chat-user-info">
          <div className="avatar">
            {selectedConversation?.fullName?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <h3>{selectedConversation?.fullName}</h3>
            <p>{selectedConversation?.email}</p>
          </div>
        </div>
      </div>

      {/* Messages container */}
      <div ref={chatContainer} className={`messages-container ${theme === "dark" ? "dark-mode" : ""}`}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`message ${message?.sender === user?._id ? "sent" : "received"}`}
            >
              <div className="message-content">
                <p>{message?.content}</p>
                <span className="message-time">
                  {formatTime(message?.timestamp)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-message">No message</p>
        )}
      </div>

      {/* Message input form */}
      <form onSubmit={handleSendMessage} className={`message-input-form ${theme === "dark" ? "dark-mode" : ""}`}>
        <input
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
