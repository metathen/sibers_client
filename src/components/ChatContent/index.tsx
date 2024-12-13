import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllMessagesMutation, useGetChannelByIdQuery } from '../../app/services/channelsApi';
import { Messages } from '../../app/types';
import styled from './index.module.css';
import { Message } from '../Message';
import { ChatForm } from '../ChatForm';
import { io } from 'socket.io-client';
import useSocket from '../../hooks/send-message';
import { ChatNavbar } from '../ChatNavbar';
import { useAppSelector } from '../../hooks';

export const ChatContent = () => {
	const {id} = useParams<{ id: string }>();
	const user = useAppSelector((state) => state.auth.user.id);
	if(!user) return;
	const [messages, setMessages] = useState<Messages[]>([]);
	const [getAllMessages, { data, isLoading, isError }] = useGetAllMessagesMutation();


	//Connect with socket
	const socketFunction = (message: Messages) => setMessages((prev) => [...prev, message]);

	if(!id) return;
	useSocket({channelId: id, onReceiveMessage: socketFunction});

	const fetchMessages = async () => {
		try {
		  const response = await getAllMessages({ channelId: String(id) }).unwrap();
		  setMessages(response);
		} catch (error) {
		  console.error('Failed to fetch messages:', error);
		}
	};
	
	//load messages
	useEffect(() => {
		fetchMessages();
	}, [id]);
	return (
		<div className={styled['chat-content']}>
			<ChatNavbar />
			<div className={styled['chat-box']}>
				<div className={'flex flex-col justify-end pr-20 pl-20'}>{messages && messages.length > 0 ? (
						messages.map((item) => (<Message id={item.id} text={item.text} senderId={item.senderId} name={item.sender.username} isMe={item.senderId == user ? true : false} createdAt={item.createdAt} />))
					) : 
						<p>Doesnt have any messages</p>
					}
				</div>
			</div>
			{id && <ChatForm channelId={id} />}
		</div>
	)
}
