import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [receivedMessage, setReceivedMessage] = useState<any>();

  useEffect(() => {
    try {
      const socket: WebSocket = new WebSocket(url);

      socket.onopen = () => {
        setWebSocket(socket);
        socket.onmessage = (event) => {
          console.log(JSON.parse(event.data),'connection established');
          setReceivedMessage(JSON.parse(event.data));
        };
      };

      return () => {
        socket.close();
      };
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  }, [url]);

  const sendMessage = (message: string) => {
    try {
      if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(message);
      } else {
        console.error('WebSocket is not open');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return {
    receivedMessage,
    sendMessage,
  };
};

export default useWebSocket;
