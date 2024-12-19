export type User = {
	id: string;
	username: string;
	password: string;
	avatarUrl?: string | null;
	createdAt: Date;
	updatedAt: Date;
	channels: Channels[];
	messages: Messages[];
}
export type Channels = {
	id: string;
	name: string;
	members: User[];
	creatorId: string;
	createdAt: Date;
	updatedAt: Date;
	messages: Messages[];
	user?: User;
	userId?: string;

}
export type Messages = {
	id: string;
	channels: Channels;
	channelId: string;
	sender: User;
	senderId: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
}