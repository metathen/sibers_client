import React from 'react'
import styled from './index.module.css';
import { ChatItem } from '../ChatItem';
import { Search } from '../Search';
import { useAppSelector } from '../../hooks';

export const Nav = () => {
	const channels = useAppSelector((state) => state.auth.user?.Channels);
  console.log(channels);
  return (
	  <div className={styled['chat-nav']}>
      <Search />
      <div className={styled['chat-list']}>
        <ChatItem name='Chatgram' time='19:53' lastMessage='dlpaoid adas fdsfg' />
        {channels ? channels.map((channel) => (
          <ChatItem 
            key={channel.id}
            name={channel.name}
            time='19:44'
            lastMessage='test'
          />
        )) : false}
      </div>
    </div>
  )
}
