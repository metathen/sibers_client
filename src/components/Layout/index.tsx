import React, { useEffect, useState } from 'react'
import { Nav } from '../Nav'
import styled from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectUser } from '../../features/user-slice'
import { useNavigate } from 'react-router-dom'
import { ChatContent } from '../ChatContent'
import { AddChannel } from '../AddChannel'
import { Channels } from '../../app/types'
import { useAppSelector } from '../../hooks'

export const Layout = () => {
	const  isAuthenticated = useSelector(selectIsAuth);
	const navigate = useNavigate();
	const [channels, setChannels] = useState<Channels[]>([]);

	const channelList = useAppSelector((state) => state.auth.user?.channels);

	useEffect(() => {
		if (channelList) {
			setChannels(channelList);
		}
	}, [channelList]);

	const handleAddChannel = (newChannel: Channels) => {
		setChannels((prevChannels) => [...prevChannels, newChannel]);
	};

	useEffect(() => {
		if (channelList) {
		  setChannels(channelList);
		}
	}, [channelList]);

  	//add new channel
	const addChannel = (newChannel: Channels) => {
		setChannels((prevChannels) => (Array.isArray(prevChannels) ? [...prevChannels, newChannel] : [newChannel]));
	};

	const handleJoinChannel = (joinedChannel: Channels) => { //for sign new channel
		setChannels((prevChannels) => (Array.isArray(prevChannels) ? [...prevChannels, joinedChannel] : [joinedChannel]));
	};

	useEffect(() => {
		if(!isAuthenticated) navigate('/auth');
	})

	return (
		<div className={styled.box}>
			<div className={styled.chat}>
				<Nav channels={channels} />
				<ChatContent />
				<AddChannel onAddChannel={addChannel} />
			</div>
		</div>
	)
}
