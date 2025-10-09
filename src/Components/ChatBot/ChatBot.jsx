import React, { useState, useEffect, useRef } from "react";

import "./ChatBot.css";

import RobotIcon from "../../../logo_final_only_icon.ico"; ////////////// Adjust the path as necessary

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newMessages = [...messages, { text: inputValue, sender: "user" }];
    setMessages(newMessages);
    setInputValue("");

    // ** AI INTEGRATION POINT **
    // You can integrate your AI logic here.
    // For example, make an API call to your AI service with the `inputValue`.
    // The function `getAIResponse` is a placeholder for this logic.
    const aiResponse = await getAIResponse(inputValue);

    setMessages((currentMessages) => [
      ...currentMessages,
      { text: aiResponse, sender: "bot" },
    ]);
  };

  // ** Placeholder for AI response logic **
  // Replace this function with your actual AI API call.
  const getAIResponse = async (message) => {
    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example response
    return `This is a placeholder AI response to: "${message}"`;
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-title">
            <img src={RobotIcon} alt="Robot Icon" className="header-icon" />
            <h3>AI Assistant</h3>
          </div>
          <button onClick={toggleChat} className="close-chat-btn">
            &times;
          </button>
        </div>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chatbot-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask a question..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <button className="chatbot-toggle" onClick={toggleChat}>
        <img src={RobotIcon} alt="Chat" />
      </button>
    </div>
  );
};

export default ChatBot;
