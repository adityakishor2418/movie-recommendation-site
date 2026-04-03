import React, { useState, useRef, useEffect } from 'react';

const AIHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI movie guide. What are you looking for today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ⚠️ Paste your Groq API Key here!
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Updated to the newest reliable model
          messages: [
            { role: 'system', content: 'You are a helpful assistant on a movie database website. Keep answers short and fun.' },
            ...updatedMessages
          ]
        })
      });

      const data = await response.json();
      
      // Check if the response was actually successful
      if (response.ok && data.choices && data.choices.length > 0) {
        setMessages(prev => [...prev, data.choices[0].message]);
      } else {
        // This logs the EXACT error from Groq so we can fix it!
        console.error("Groq API Rejected the request. Details:", data);
        setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, something went wrong. Check the console!' }]);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, fontFamily: 'sans-serif' }}>
      
      {/* Chat Window */}
      {isOpen && (
        <div style={{ 
          width: '320px', height: '450px', background: '#1f1f1f', 
          borderRadius: '12px', display: 'flex', flexDirection: 'column', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)', border: '1px solid #333',
          marginBottom: '15px', overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ background: '#FFD700', color: '#1a1a1a', padding: '15px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🤖 AI Movie Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#1a1a1a' }}>✖</button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? '#FFD700' : '#333',
                color: msg.role === 'user' ? '#1a1a1a' : 'white',
                padding: '10px 14px', borderRadius: '18px', maxWidth: '80%', fontSize: '0.9rem', lineHeight: '1.4'
              }}>
                {msg.content}
              </div>
            ))}
            {isLoading && <div style={{ alignSelf: 'flex-start', color: '#888', fontSize: '0.8rem' }}>AI is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #333', padding: '10px' }}>
            <input 
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a movie..." 
              style={{ flex: 1, padding: '10px', borderRadius: '20px', border: 'none', background: '#333', color: 'white', outline: 'none' }}
            />
            <button type="submit" disabled={isLoading} style={{ 
              background: '#FFD700', color: '#1a1a1a', border: 'none', borderRadius: '50%', 
              width: '40px', height: '40px', marginLeft: '10px', cursor: 'pointer', fontWeight: 'bold',
              opacity: isLoading ? 0.5 : 1
            }}>
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px', height: '60px', borderRadius: '50%', background: '#FFD700', color: '#1a1a1a', 
            border: 'none', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default AIHelp;