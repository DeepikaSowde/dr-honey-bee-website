import React, { useState, useRef, useEffect } from "react";

export default function HiveAssistant() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Welcome to Dr. Honey Bee Farm! 🍯 How can I help you today?",
    },
  ]);

  // Auto-scroll to the latest message
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Add user message to UI
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // ⚠️ IMPORTANT: Replace this URL with your actual live Render URL!
      // Example: 'https://hive-backend-xyz.onrender.com/api/chat'
      const response = await fetch(
        "https://hive-ai-agent.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage.text }),
        },
      );

      const data = await response.json();

      // 2. Add AI response to UI
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (error) {
      console.error("Error connecting to the Hive Assistant:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, the hive is a bit busy right now. Please try again later!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        fontFamily: "sans-serif",
      }}
    >
      {/* --- Floating Action Button --- */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: "#d97706", // Honey Gold
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            padding: "14px 24px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontWeight: "600",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span>🐝</span> Chat with us
        </button>
      )}

      {/* --- Chat Window --- */}
      {isOpen && (
        <div
          style={{
            width: "350px",
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#d97706",
              color: "#fff",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>🍯</span>
              <strong
                style={{ margin: 0, fontSize: "16px", letterSpacing: "0.5px" }}
              >
                Hive Assistant
              </strong>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: "20px",
                padding: "0",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              height: "380px",
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "#fafaf9",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.role === "user" ? "#f3f4f6" : "#fef3c7",
                  color: "#1f2937",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                  borderBottomLeftRadius: msg.role === "ai" ? "4px" : "16px",
                  maxWidth: "85%",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  color: "#9ca3af",
                  fontSize: "13px",
                  paddingLeft: "8px",
                  fontStyle: "italic",
                }}
              >
                Checking the hives...
              </div>
            )}
            {/* Invisible div to keep auto-scroll anchored */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              padding: "12px",
              borderTop: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about our pure honey..."
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                marginRight: "8px",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              style={{
                backgroundColor: "#d97706",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 16px",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                transition: "background-color 0.2s",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
