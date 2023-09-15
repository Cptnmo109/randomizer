import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  ChatContainer,
  MessageList,
  MessageInput,
  Message,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"; // Import the CSS styles for Chat UI Kit
import "./Dashboard.css"; // Import your custom CSS file

const socket = io("http://localhost:3001", {
  withCredentials: true,
  transports: ["websocket"],
});

function Dashboard() {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState([]);

  useEffect(() => {
    fetchUserData();
    setupSocketListeners();
  }, []);

  const fetchUserData = () => {
    axios
      .get("http://localhost:3001/getUser", { withCredentials: true })
      .then((response) => {
        if (response.data && response.data.user && response.data.user.email) {
          setUsername(`User: ${response.data.user.email}`);
        } else {
          const uname = sessionStorage.getItem("username");
          setUsername(`User: ${uname}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching user email:", error);
      });
  };

  const setupSocketListeners = () => {
    socket.on("login success", function (user) {
      setUsername(`User: ${user.email}`);
    });

    socket.on("logout", function () {
      setUsername("");
    });

    socket.on("chat message", function (message) {
      setMessages([...messages, message]);
    });
  };

  const handleRoomFormSubmit = (e) => {
    e.preventDefault();
    if (roomName.trim()) {
      socket.emit("create room", roomName);
    }
  };

  const handleFormSubmit = (messageText) => {
    if (messageText) {
      const messageWithUsername = `${username}: ${messageText}`;
      socket.emit("chat message", messageWithUsername);
      setInputMessage("");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="chat-header">Jobii Chat App</div>
      <ChatContainer>
        <MessageList>
          {messages.map((msg, index) => (
            <Message
              key={index}
              model={{
                message: msg,
                sentTime: new Date(),
                sender: {
                  name: username,
                },
              }}
              type={msg.startsWith(username) ? "outgoing" : "incoming"}
            />
          ))}
        </MessageList>
        <MessageInput
          value={inputMessage}
          onSend={(messageText) => handleFormSubmit(messageText)}
        />
      </ChatContainer>
      <form className="room-form" onSubmit={handleRoomFormSubmit}>
        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit">Create/Join Room</button>
      </form>
    </div>
  );
}

export default Dashboard;
