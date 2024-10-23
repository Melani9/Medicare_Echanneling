import React, { useState } from 'react';
import { sendMessageToDialogflow } from './chatbotService';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reply = await sendMessageToDialogflow(message);
    setResponses([...responses, { user: message, bot: reply.fulfillmentText }]);
    setMessage('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '400px', height: '600px', zIndex: 1000, background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', padding: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Chat with our AI Medical Bot</h2>
      <div style={{ height: '500px', overflowY: 'auto', marginBottom: '10px' }}>
        {responses.map((resp, index) => (
          <div key={index}>
            <p><strong>You:</strong> {resp.user}</p>
            <p><strong>Bot:</strong> {resp.bot}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          style={{ width: 'calc(100% - 60px)', marginRight: '10px' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
