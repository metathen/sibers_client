import React, { useEffect, useState } from 'react'
import styled from './index.module.css';
import { ChatItem } from '../ChatItem';
import { Search } from '../Search';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useGetAllMessagesMutation } from '../../app/services/channelsApi';
import useSocket from '../../hooks/send-message';
import { Messages } from '../../app/types';

export const Nav = () => {
	const channels = useAppSelector((state) => state.auth.user?.channels);
  const navigate = useNavigate();
  const handleChannelClick = (channelId: string) => {
    navigate(`/channels/${channelId}`);
  };
  const [lastMessages, setLastMessages] = useState<{ [channelId: string]: string }>({}); // save the last messages
  const [getAllMessages, { isLoading, isError }] = useGetAllMessagesMutation();

  const fetchLastMessages = async () => {
    if (!channels) return;

    // get the last message
    for (const channel of channels) {
      try {
        const messages = await getAllMessages({channelId: channel.id}).unwrap();
        const lastMessage = messages[messages.length - 1]; //get the last message
        setLastMessages((prev) => ({
          ...prev,
          [channel.id]: lastMessage ? lastMessage.text : 'No messages yet', // save message
        }));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };
  const handleNewMessage = (message: Messages) => {
    setLastMessages((prev) => ({
      ...prev,
      [message.channelId]: message.text, //update last message
    }));
  };

  const socketConnections = channels?.map((channel) => {
    return useSocket({
      channelId: channel.id,
      onReceiveMessage: handleNewMessage,
    });
  });

  useEffect(() => {
    fetchLastMessages();
  }, [channels]);
  return (
	  <div className={styled['chat-nav']}>
      <Search />
      <div className={styled['chat-list']}>
        {channels ? channels.map((channel) => (
          <div key={channel.id} className={styled['chat-item'] + 'w-[100%]'}
            onClick={() => handleChannelClick(channel.id)}
          >
            <ChatItem 
              name={channel.name}
              time={lastMessages[channel.id]}
              lastMessage={lastMessages[channel.id]}
            />
          </div>
        )) : false}
      </div>
    </div>
  )
}
