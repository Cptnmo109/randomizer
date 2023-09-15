// ScrollToBottom.js (Create a new component for scrolling)

import React, { useEffect, useRef } from "react";

const ScrollToBottom = ({ children }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [children]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {children}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ScrollToBottom;
