import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addConversation } from "../store/slices/conversationSlice";
import { initSocket, socket } from "../services/socket";
import ConversationList from "../components/ConversationList";
import ChatBox from "../components/ChatBox";
import "../styles/Chat.css";
import { useTheme } from "../context/ThemeContext";

function Chat() {
  const { theme, toggleTheme } = useTheme();
  const [activeUsers, setActiveUsers] = useState([]);
  const userData = useSelector((state) => state.authSlice.user);
  const [contactEmail, setContactEmail] = useState("");
  const [showInputBox, setShowInputBox] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 
  const dispatch = useDispatch();
  const { selectedConversation, conversation } = useSelector(
    (state) => state.conversationSlice
  );

  const handelAddConversation = async (e) => {
    e.preventDefault();
    try {
      dispatch(addConversation(contactEmail));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  const size = conversation.length;

  useEffect(() => {
    initSocket();
    socket.on("active_users", (res) => setActiveUsers(res));
  }, []);

  useEffect(() => {
    conversation.forEach((item) => {
      socket.emit("join_room", item._id);
    });
  }, [size]);

  const logout = () => {
    // Clear cookies and localStorage for logout
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    window.location.href = "/login"; 
  };


  return (
    <div className={`main-chat_container ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className="chat-container">
        <div className={`sidebar ${selectedConversation ? "" : "active"} ${theme === "dark" ? "dark-mode" : ""}`}>
          <div className={`sidebar-header ${theme === "dark" ? "dark-mode" : ""}`}>
            <div className="user-info">
              <Link to="/chat/profile" className="user-profile">
                <div className="userImg">
                    {userData?.avatar ? (
                      <img src={userData?.avatar} alt="profile" />
                    ) : (
                      <div className="default-avatar">{userData?.fullName?.charAt(0).toUpperCase()}</div>  
                    )}
                  </div>
                <h4>{userData?.fullName}</h4>
              </Link>
              <div className={`menu-container ${theme === "dark" ? "dark-mode" : ""}`}>
                <button
                  className="menu-button"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  &#9776; 
                </button>

                {showMenu && (
                  <div className={`menu-dropdown ${theme === "dark" ? "dark-mode" : ""}`}>
                    <button className="menu-item" onClick={toggleTheme}>
                      <i className="fas fa-moon"></i> Dark Mode
                    </button>
                    <button className="menu-item" onClick={logout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="conversation-header-container">
              <h2>Conversations</h2>
              <button
                className="new-conversation-button"
                onClick={() => setShowInputBox(true)}
                style={{ display: showInputBox ? "none" : "block" }}
              >
                +
              </button>
            </div>

            {showInputBox && (
              <form
                className="email-input-container"
                onSubmit={handelAddConversation}
              >
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="email-input"
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
                <div className="input-actions">
                  <button type="submit" className="add-button">
                    Add
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setShowInputBox(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <ConversationList activeUsers={activeUsers} />
        </div>

        {selectedConversation ? (
          <ChatBox conversation={selectedConversation} currentUser={userData} />
        ) : (
          <div className={`chat-box empty-chat ${theme === "dark" ? "dark-mode" : ""}`}>
            <div className="no-conversation-selected">
              <p>Select a conversation or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
