import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3080';

type UseSocketProps = {
  channelId: string;
  onReceiveMessage: (message: any) => void; //Callback function for handling messages
}

const useSocket = ({ channelId, onReceiveMessage }: UseSocketProps) => {
  useEffect(() => {
    if (!channelId) return;

    const socket: Socket = io(SOCKET_URL);
    console.log('Socket connected:', socket.connected); // check connection

    // join
    socket.emit('joinChannel', channelId);

    // Handling the reception of a new message
    socket.on('receiveMessage', onReceiveMessage);

    return () => {
      socket.disconnect();
    };
  }, [channelId, onReceiveMessage]);
};

export default useSocket;