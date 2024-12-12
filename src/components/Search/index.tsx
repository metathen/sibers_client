import React, { useState } from 'react'
import styled from '../Nav/index.module.css';
import { Input } from '@nextui-org/react';

export const Search: React.FC = () => {
	return (
		<div className={styled['chat-head']}>
			<Input type="text" labelPlacement="outside" placeholder="Search" />
		</div>
	)
}
