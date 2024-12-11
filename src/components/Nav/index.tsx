import React from 'react'
import styled from './index.module.css';
import { Input } from '@nextui-org/react';

export const Nav = () => {
  return (
	  <div className={styled['chat-nav']}>
      <div className={styled['chat-head']}>
        <Input type="text" labelPlacement="outside" placeholder="Search" />
      </div>
    </div>
  )
}
