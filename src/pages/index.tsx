'use client';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');
  const workspaceID = 'myWorkspace1';
  
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:5000/ws?workspace_id=${workspaceID}`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      setMessage(event.data);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [workspaceID]);

  const sendMessage = () => {
    const socket = new WebSocket(`ws://localhost:5000/ws?workspace_id=${workspaceID}`);
    socket.onopen = () => {
      socket.send(input);
    };
  };

  return (
    <div>
      <p>Status: {message}</p>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default MainPage;
