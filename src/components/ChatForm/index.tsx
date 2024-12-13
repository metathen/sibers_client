import { Button, Card, Input } from "@nextui-org/react"
import { InputProject } from "../Input"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSendMessageMutation } from "../../app/services/channelsApi";

type SendMessageProps = {
	channelId: string;
}

export const ChatForm = ({channelId}: SendMessageProps) => {
	const [text, setText] = useState<string>('');
	const [sendMessage, { isLoading }] = useSendMessageMutation();

	const handleSendMessage = async () => {
		if (!text) return;

		try {
			await sendMessage({ channelId, text }).unwrap();
			setText('');
		} catch (err) {
			console.error('Error sending message:', err);
		}
	};
	const {
		handleSubmit,
		control,
		formState: {errors}
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onBlur',
		defaultValues: {
			text: '',
		}
	});
	return (
		<div className="pl-10 pr-10">
			<Card className="flex mr-18 ml-18">
				<Input
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<Button isIconOnly color="secondary" onPress={handleSendMessage}>{'>'}</Button>
			</Card>
		</div>
	)
}
