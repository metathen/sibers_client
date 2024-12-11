import React from 'react'
import { Nav } from '../Nav'
import styled from './index.module.css'

export const Layout = () => {
  return (
	<div className={styled.box}>
		<div className={styled.chat}>
			<Nav />
		</div>
	</div>
  )
}
