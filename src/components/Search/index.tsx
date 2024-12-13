import React, { useEffect, useState } from 'react'
import styled from '../Nav/index.module.css';
import { Autocomplete, AutocompleteItem, Input, Button, Avatar } from '@nextui-org/react';
import { useSerachUserMutation } from '../../app/services/userApi';

export const Search: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [searchUser, { data, isLoading, isError }] = useSerachUserMutation();
	const [users, setUsers] = useState<any[]>([]);

	useEffect(() => {
		if (username.length > 2) {
			const fetchData = async () => {
				try {
					const response = await searchUser({username}).unwrap();
					setUsers(response);
				} catch (error) {
					console.error('Error fetching users:', error);
				}
			};

			fetchData();
		} else {
			setUsers([]); //clear user list
		}
	}, [username, searchUser]);
	return (
		<div className={styled['chat-head']}>
			{/* <Input type="text" labelPlacement="outside" placeholder="Search" onChange={(e) => setUsername(e.target.value)} /> */}
			<Autocomplete
				aria-label="Select an employee"
				classNames={{
					base: "max-w-xs",
					listboxWrapper: "max-h-[320px]",
					selectorButton: "text-default-500",
				}}
				defaultItems={users}
				inputProps={{
					classNames: {
					input: "ml-1",
					inputWrapper: "h-[48px]",
					},
				}}
				listboxProps={{
					hideSelectedIcon: true,
					itemClasses: {
					base: [
						"rounded-medium",
						"text-default-500",
						"transition-opacity",
						"data-[hover=true]:text-foreground",
						"dark:data-[hover=true]:bg-default-50",
						"data-[pressed=true]:opacity-70",
						"data-[hover=true]:bg-default-200",
						"data-[selectable=true]:focus:bg-default-100",
						"data-[focus-visible=true]:ring-default-500",
					],
					},
				}}
				placeholder="Enter employee name"
				popoverProps={{
					offset: 10,
					classNames: {
					base: "rounded-large",
					content: "p-1 border-small border-default-100 bg-background",
					},
				}}
				radius="full"
				variant="bordered"
				onChange={(e) => setUsername(e.target.value)}
			>
				{(item) => (
					<AutocompleteItem key={item.id} textValue={item.name}>
					<div className="flex justify-between items-center">
						<div className="flex gap-2 items-center">
						<Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
						<div className="flex flex-col">
							<span className="text-small">{item.name}</span>
							<span className="text-tiny text-default-400">{item.team}</span>
						</div>
						</div>
						<Button
						className="border-small mr-0.5 font-medium shadow-small"
						radius="full"
						size="sm"
						variant="bordered"
						>
						Add
						</Button>
					</div>
					</AutocompleteItem>
				)}
				</Autocomplete>
		</div>
	)
}
