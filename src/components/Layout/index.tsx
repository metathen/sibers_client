import React, { useEffect } from 'react'
import { Nav } from '../Nav'
import styled from './index.module.css'
import { useSelector } from 'react-redux'
import { selectIsAuth, selectUser } from '../../features/user-slice'
import { useNavigate } from 'react-router-dom'
import { ChatContent } from '../ChatContent'

export const Layout = () => {
	const  isAuthenticated = useSelector(selectIsAuth);
	const user = useSelector(selectUser);
	const navigate = useNavigate();

	useEffect(() => {
		if(!isAuthenticated) navigate('/auth');
	})

	return (
		<div className={styled.box}>
			<div className={styled.chat}>
				<Nav />
				<ChatContent />
			</div>
		</div>
	)
}
