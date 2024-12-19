import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Listbox, ListboxItem,
	Chip
} from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import styled from './index.module.css';
import { useEffect, useState } from "react";
import { useDeleteUserMutation, useGetChannelByIdQuery, useJoinChannelMutation } from "../../app/services/channelsApi";
import { useGetUserByIdMutation } from "../../app/services/userApi";
import { User } from "../../app/types";
import { errorField } from "../../utils/error-field";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../../const";

export const ChatNavbar = () => {
	const { id } = useParams<{ id: string }>();

	if(!id) return;

	const socket: Socket = io(BASE_URL);
	//save users data
	const [userList, setUserList] = useState<User[]>([]);

	//get the current user's information from the global state
	const user = useAppSelector((state) => state.auth.user);

	//delete the user
	const [deleteUser] = useDeleteUserMutation();

	//for error log
	const [errorLog, setError] = useState('');

	//modal part
	const {isOpen, onOpen, onOpenChange} = useDisclosure();

	//get channel data
	const { data: channel, isLoading: isChannelLoading, error: channelError } = useGetChannelByIdQuery(id || "");
  
	const [isUserInChannel, setIsUserInChannel] = useState<boolean>(false);

	const [joinChannel, { isLoading }] = useJoinChannelMutation() //for join in the channel

	const handleDelete = async (userId: string) => { //function delete the user
		try {
		  	const response = await deleteUser({ channelId: id, userId }).unwrap();
		  	if (response) {
				setUserList((prevList) => prevList.filter(user => user.id !== userId));
		  	}
		} catch (err) {
		  	console.error('Error deleting user:', err);
			if(errorField(errorLog)) setError(errorLog.data.error);
		}
	};

	const handleSign = async () => { //function join
		try {
			const response = await joinChannel({ channelId: id }).unwrap(); //start endpoint

			//server notification about a new member socket
			console.log(response)
			// Update UI
			setIsUserInChannel(true);
		} catch (error) {
		  	console.error("Error joining channel:", error);
		}
	};

  
	//сheck if the user is a member of this chat
	useEffect(() => {
		if (user && user.channels) {
			//сhecking if the ID is in the user's list of channels
			const isMember = user.channels.some((channel) => channel.id === id);
			setIsUserInChannel(isMember); //setting the state if the user is a member of this chat
		}
	}, [id, user]);
	useEffect(() => {
		if (channel?.members) {
		  setUserList(channel.members);
		}
	}, [channel?.members]);
	return (
		<Navbar isBordered>
			<NavbarBrand className="flex gap-2 align-center cursor-pointer" onClick={onOpen}>
				<Avatar name={channel?.name} />
				<div className={styled['head-box']}>
					<p className="font-semibold">{channel?.name}</p>
					<span>{userList.length} users</span>
				</div>
			</NavbarBrand>
			<Modal
				backdrop="opaque"
				classNames={{
					backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
				}}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">User Lists</ModalHeader>
					<ModalBody>
						<Listbox
							classNames={{
								base: "max-w-[100%] w-[100%]",
								list: "max-h-[300px] overflow-scroll",
							}}
							defaultSelectedKeys={["1"]}
							selectionMode="none"
							items={userList}
							disableAnimation={true}
						>
							{(item) => (
								<ListboxItem key={item.id} textValue={item.username} isReadOnly={true}>
									<div className="flex items-center w-[100%]">
										<Avatar alt={item.username} className="flex-shrink-0" size="sm" name={item.username} />
										<div className="flex flex-col ml-2 mr-2">
											<span className="text-small">{item.username}</span>
										</div>
										{item.id == channel?.creatorId && <Chip size="sm" color="secondary">Admin</Chip>}
										{item.id !== channel?.creatorId && item.id !== user?.id && (
											<Button
												onPress={() => handleDelete(item.id)}
												className="flex justify-end mr-0 ml-auto"
												color="danger"
												variant="bordered"
											>
												{isLoading ? "Deleting..." : "Delete"}
											</Button>
										)}
									</div>
								</ListboxItem>
							)}
						</Listbox>
					</ModalBody>
				</ModalContent>
			</Modal>
			<NavbarContent justify="end">
				<NavbarItem className="flex gap-2">
					{!isUserInChannel &&
						<Button color="secondary" onPress={handleSign}>
							{isLoading ? "Signing..." : "Sign"}
						</Button>
					}
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	)
}
