'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Mic, Smile } from 'lucide-react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { sendMessage, subscribeToMessages, ChatMessage } from './chatService';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  date: string;
}

export default function ChatPage(): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // Get email from cookie
  let email: string | undefined = undefined;
  if (typeof window !== 'undefined') {
    email = getCookie('userEmail') as string | undefined;
  }
  // Determine who to show at the top based on email
  let chatPartner = 'Yusuf';
  let chatPartnerInitial = 'Y';
  let senderName = '';
  if (email === 'ceresyusuf@gmail.com') {
    chatPartner = 'Aneeqah';
    chatPartnerInitial = 'A';
    senderName = 'Yusuf';
  } else if (email === 'aneeqahabdol@gmail.com') {
    chatPartner = 'Yusuf';
    chatPartnerInitial = 'Y';
    senderName = 'Aneeqah';
  }

  useEffect(() => {
    const unsubscribe = subscribeToMessages(setMessages);
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (): Promise<void> => {
    if (!message.trim() || !senderName) return;
    await sendMessage(message, senderName);
    setMessage('');
  };

  const handleAttachment = (): void => {
    // Placeholder function - implement later
    console.log('Open attachment menu');
  };

  const handleVoiceMessage = (): void => {
    // Placeholder function - implement later
    console.log('Start voice recording');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{chatPartnerInitial}</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">{chatPartner}</h1>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Video className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === senderName ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.sender === senderName
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === senderName
                  ? 'text-blue-100'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {msg.timestamp && msg.timestamp.toDate && typeof msg.timestamp.toDate === 'function'
                  ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ''}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <button 
            type="button"
            onClick={handleAttachment}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <Paperclip className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 pr-12 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <Smile className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {message.trim() ? (
            <button 
              type="button"
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
            >
              <Send className="h-5 w-5 text-white" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleVoiceMessage}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Mic className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}