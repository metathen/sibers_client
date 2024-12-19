import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../const';

type UseSocketProps = {
  channelId: string;
  onReceiveMessage: (message: any) => void; //сallback function for handling messages
  onUserJoined?: (userCount: number) => void;
}

const useSocket = ({ channelId, onReceiveMessage}: UseSocketProps) => {
  useEffect(() => {
    if (!channelId) return;

    const socket: Socket = io(BASE_URL);
    console.log('Socket connected:', socket.connected); // check connection
    // join
    socket.emit('joinChannel', channelId);

    socket.on("connect", () => console.log("Socket connected:", socket.id));
    socket.on("connect_error", (err) => console.error("Connection error:", err));
    socket.on("disconnect", () => console.log("Socket disconnected"));
    socket.connect();

    socket.on('receiveMessage', (message) => onReceiveMessage(message));

    return () => {
      socket.disconnect();
    };
  }, [channelId, onReceiveMessage]);
};

export default useSocket;