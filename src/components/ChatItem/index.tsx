import React from 'react'
import style from '../Nav/index.module.css';
import { Image } from '@nextui-org/react';

type Props = {
	name: string;
	time: string;
	lastMessage: string;
}

export const ChatItem = ({name, time, lastMessage}: Props) => {
  return (
	<div className={style['chat-item'] + ' cursor-pointer'}>
		<div className={style['chat-logo']}>
			<Image
				alt="NextUI hero Image"
				src="https://nextui.org/images/hero-card-complete.jpeg"
				width={48}
				height={48}
			/>
		</div>
		<div className={style['chat-name']}>
			<p className='t-smb'>{name}</p>
			<span>{lastMessage}</span>
		</div>
		<div className={style['chat-info']}>
			<span>{time}</span>
		</div>
	</div>
  )
}
