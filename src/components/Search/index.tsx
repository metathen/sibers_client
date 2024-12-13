import React, { useCallback, useEffect, useState } from 'react'
import styled from '../Nav/index.module.css';
import { debounce } from 'lodash';
import { Autocomplete, AutocompleteItem, Input, Button, Avatar } from '@nextui-org/react';
import { useSerachUserMutation } from '../../app/services/userApi';

export const Search: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [searchUser, { data, isLoading, isError }] = useSerachUserMutation();
	const [users, setUsers] = useState<any[]>([]);

	const debouncedSearch = useCallback( //optimization server request
		debounce(async (value: string) => {
			if (value.length > 2) {
				try {
					const response = await searchUser({ username: value }).unwrap();
					setUsers(response);
				} catch (error) {
					console.error('Error fetching users:', error);
				}
			} else {
					setUsers([]);
			}
		}, 300),
		[searchUser]
	);

	useEffect(() => {
		debouncedSearch(username);
		return () => debouncedSearch.cancel();
	}, [username, debouncedSearch]);
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
				items={users.map((user) => ({
					id: user.id,
					name: user.username,
					avatar: user.avatarurl,
					team: user.team || "Unknown",
				}))}
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
				placeholder="Search user"
				popoverProps={{
					offset: 10,
					classNames: {
					base: "rounded-large",
					content: "p-1 border-small border-default-100 bg-background",
					},
				}}
				radius="full"
				variant="bordered"
				onInputChange={(e) => setUsername(e)}
			>
				{(item) => (
					<AutocompleteItem key={item.id} textValue={item.name}>
						<div className="flex justify-between items-center">
							<div className="flex gap-2 items-center">
								<Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
								<div className="flex flex-col">
									<span className="text-small">{item.name}</span>
								</div>
							</div>
						</div>
					</AutocompleteItem>
				)}
			</Autocomplete>
		</div>
	)
}
