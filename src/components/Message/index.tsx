import { Avatar, Card } from '@nextui-org/react';
import { User } from '../../app/types';

type Props = {
	text: string;
	senderId: string;
	isMe: boolean;
	createdAt: Date;
	name: string;
}

export const Message = ({text, senderId, isMe, createdAt, name}: Props) => {
	if (!name) return <div>Error: User name is missing</div>;
	return (
		<div className={`flex w-[100%] mb-2`}>
			{isMe ? (
				<div className="w-[100%] flex gap-2 justify-end">
					<Card className={`pt-2 pb-2 pr-8 pl-4 inline-block rounded-small`}>{text}</Card>
					<Avatar name={name} />
				</div>
			) : (
				<div className="w-[100%] flex gap-2">
					<Avatar name={name} />
					<Card className={`pt-2 pb-2 pr-8 pl-4 inline-block rounded-small`}>{text}</Card>
				</div>
			)}
			
		</div>
	)
}
