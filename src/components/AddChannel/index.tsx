import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
} from "@nextui-org/react";
import styled from './index.module.css';
import { useState } from "react";
import { useCreateChannelMutation } from "../../app/services/channelsApi";

export const AddChannel = () => {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [channelName, setChannelName] = useState("");
	const [createChannel, { isLoading, isError }] = useCreateChannelMutation(); 

	const handleCreateChannel = async () => {
		if (!channelName.trim()) {
			alert("Please enter a valid channel name");
			return;
		}

		try {
			await createChannel({ name: channelName }).unwrap();
			onOpenChange();
		} catch (error) {
			console.error("Error creating channel:", error);
			alert("Failed to create channel");
		}
	};

	return (
		<div className={styled['add']}>
			<Button isIconOnly radius='full' color='secondary' onPress={onOpen}>+</Button>
			<Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} backdrop="opaque"
				classNames={{
					backdrop: "bg-gradient-to-t from-zinc-700 to-zinc-700/10 backdrop-opacity-40",
				}}
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">Create Channel</ModalHeader>
					<ModalBody>
						<Input
							label="Channel name"
							placeholder="Enter channel name"
							variant="bordered"
							value={channelName}
							onChange={(e) => setChannelName(e.target.value)}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onPress={handleCreateChannel}>Create</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	)
}