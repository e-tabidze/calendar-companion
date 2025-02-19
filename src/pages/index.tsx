'use client';
import { useEffect, useState } from 'react';
import {LandingComp} from "src/views/components/landing/landing";

const MainPage = () => {
  const [message, setMessage] = useState('');
  const workspaceID = 'myWorkspace1';
  
  useEffect(() => {
    const socket = new WebSocket(`wss://api.companyon.ai/ws?workspace_id=${workspaceID}`);

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

  // const sendMessage = () => {
  //   const socket = new WebSocket(`ws://localhost:5000/ws?workspace_id=${workspaceID}`);
  //   socket.onopen = () => {
  //     socket.send(input);
  //   };
  // };

  console.log(message, 'message')

  return (
      <div>
        <LandingComp />
      </div>
  );
};

export default MainPage;
