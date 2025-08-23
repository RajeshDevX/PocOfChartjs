// ChatApp.tsx
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

interface Message {
  user: string;
  text: string;
  self?: boolean;
  system?: boolean;
}

const ChatApp: React.FC = () => {
  const [socket, setSocket] = useState<any | null>(null);
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const s = io("https://poc-chat-application-production.up.railway.app");
    setSocket(s);

    s.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("typing", (name: string) => {
      if (!name) return;
      setTyping(`${name} is typing...`);
      setTimeout(() => setTyping(""), 1500);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !user.trim() || !socket) return;
    const msg: Message = { user, text, self: true };
    socket.emit("message", msg);
    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  const handleTyping = () => {
    if (socket && user.trim()) {
      socket.emit("typing", user);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.self ? "right" : "left",
              margin: "5px 0",
              fontStyle: msg.system ? "italic" : "normal",
              color: msg.system ? "gray" : "black",
            }}
          >
            {!msg.system && <strong>{msg.user}: </strong>}
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      <div style={{ fontSize: "12px", padding: "0 10px", color: "gray" }}>
        {typing}
      </div>

      {/* Input */}
      <div style={{ display: "flex", padding: "10px", gap: "5px" }}>
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ width: "120px" }}
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleTyping}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1 }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
