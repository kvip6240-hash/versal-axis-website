import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { MessageSquare, Send, Building2, User, CheckCheck } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { projects } = useDemo();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'PrimeCare Facilities Ltd',
      text: 'Hello Alex, we have confirmed your HVAC maintenance for 20 Sep 2026. Senior Lead Mark Davies will be on site at 08:00 AM.',
      time: '09:15 AM',
      isMe: false,
    },
    {
      id: 2,
      sender: 'Alex Morgan',
      text: 'Thank you Mark. Please instruct the team to report to Reception on the Ground Floor for site security passes.',
      time: '09:22 AM',
      isMe: true,
    },
    {
      id: 3,
      sender: 'PrimeCare Facilities Ltd',
      text: 'Understood! The team has received your access instructions.',
      time: '09:25 AM',
      isMe: false,
    },
  ]);

  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'Alex Morgan',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'PrimeCare Facilities Ltd',
          text: 'Received! We will keep you updated via the project timeline.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="messages-page-root">
      <div className="container">
        <div className="page-head-row">
          <div>
            <span className="kicker">DIRECT PROVIDER CHAT</span>
            <h2>Project Messaging</h2>
            <p>Direct communication channel with your assigned service provider.</p>
          </div>
        </div>

        <div className="chat-layout-card">
          <div className="chat-sidebar">
            <div className="chat-sidebar-head">
              <h3>Active Conversations</h3>
            </div>
            <div className="chat-thread-item active">
              <div className="thread-avatar"><Building2 size={18} /></div>
              <div className="thread-info">
                <strong>PrimeCare Facilities Ltd</strong>
                <span>REQ-2026-001248 (HVAC)</span>
              </div>
            </div>
          </div>

          <div className="chat-main-area">
            <div className="chat-main-head">
              <div className="head-provider-info">
                <Building2 size={20} color="#146358" />
                <div>
                  <strong>PrimeCare Facilities Ltd</strong>
                  <span className="live-status">● Online — On-site Technician Lead</span>
                </div>
              </div>
            </div>

            <div className="chat-messages-stream">
              {messages.map(m => (
                <div key={m.id} className={`chat-bubble-wrap ${m.isMe ? 'me' : 'them'}`}>
                  <div className="chat-bubble">
                    <span className="bubble-sender">{m.sender}</span>
                    <p>{m.text}</p>
                    <span className="bubble-time">{m.time} {m.isMe && <CheckCheck size={12} />}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="chat-input-bar">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message to PrimeCare Facilities Ltd..."
              />
              <button type="submit" className="btn-primary pill send-btn">
                <Send size={16} /> Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
