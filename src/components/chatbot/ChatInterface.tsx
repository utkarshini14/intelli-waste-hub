
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your waste management assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Autofocus the input field on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Get query param q if it exists
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot response after a delay
    // In a real application, you would make an API call here
    setTimeout(() => {
      const botResponses = [
        "Plastic bottles should be rinsed and have caps removed before recycling.",
        "Glass can be recycled indefinitely without loss of quality.",
        "Food-contaminated paper and cardboard usually can't be recycled.",
        "Electronic waste should be taken to specialized collection points.",
        "Batteries contain hazardous materials and should never go in regular trash.",
        "Composting food waste can reduce your household waste by up to 30%.",
        "Aluminum cans are among the most efficiently recycled items.",
      ];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleReset = () => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your waste management assistant. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="flex flex-col h-[70vh] max-h-[800px] w-full max-w-3xl mx-auto rounded-xl shadow-glass overflow-hidden border border-intelliwaste-gray-medium bg-white">
      {/* Chat header */}
      <div className="p-4 border-b border-intelliwaste-gray-medium bg-intelliwaste-gray flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-intelliwaste-blue rounded-full flex items-center justify-center text-white">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-medium">Waste Assistant</h3>
            <span className="text-xs text-intelliwaste-gray-dark">
              AI-powered waste management expert
            </span>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 rounded-md hover:bg-intelliwaste-gray-medium text-intelliwaste-gray-dark transition-colors"
          title="Reset conversation"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-intelliwaste-gray/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div 
              className={`max-w-[75%] rounded-2xl p-3 ${
                message.sender === 'user'
                  ? 'bg-intelliwaste-blue text-white rounded-tr-none'
                  : 'bg-white border border-intelliwaste-gray-medium rounded-tl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'bot' ? (
                  <Bot size={16} className="text-intelliwaste-blue" />
                ) : (
                  <User size={16} />
                )}
                <span className="text-xs opacity-75">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[75%] rounded-2xl p-3 bg-white border border-intelliwaste-gray-medium rounded-tl-none">
              <div className="flex items-center gap-2 mb-1">
                <Bot size={16} className="text-intelliwaste-blue" />
                <span className="text-xs opacity-75">Typing...</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-intelliwaste-gray-dark animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-intelliwaste-gray-dark animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-intelliwaste-gray-dark animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-intelliwaste-gray-medium bg-white">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about waste management..."
            className="flex-1 px-4 py-2 rounded-lg border border-intelliwaste-gray-medium focus:border-intelliwaste-blue focus:ring-1 focus:ring-intelliwaste-blue/30 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className={`p-3 rounded-lg ${
              !inputValue.trim() || isLoading
                ? 'bg-intelliwaste-gray-medium text-intelliwaste-gray-dark'
                : 'bg-intelliwaste-blue text-white hover:bg-intelliwaste-blue-dark'
            } transition-colors`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-2 text-xs text-intelliwaste-gray-dark text-center">
          Ask about recycling, waste reduction, or proper disposal methods
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
