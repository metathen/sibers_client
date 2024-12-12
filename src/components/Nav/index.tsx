import React from 'react'
import styled from './index.module.css';
import { ChatItem } from '../ChatItem';
import { Search } from '../Search';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export const Nav = () => {
	const channels = useAppSelector((state) => state.auth.user?.Channels);
  const navigate = useNavigate();
  console.log(channels);
  const handleChannelClick = (channelId: string) => {
    navigate(`/channels/${channelId}`);
  };
  return (
	  <div className={styled['chat-nav']}>
      <Search />
      <div className={styled['chat-list']}>
        <ChatItem name='Chatgram' time='19:53' lastMessage='dlpaoid adas fdsfg' />
        {channels ? channels.map((channel) => (
          <div className={styled['chat-item'] + 'w-[100%]'}
            onClick={() => handleChannelClick(channel.id)}
          >
            <ChatItem 
              key={channel.id}
              name={channel.name}
              time='19:44'
              lastMessage='test'
            />
          </div>
        )) : false}
      </div>
    </div>
  )
}
