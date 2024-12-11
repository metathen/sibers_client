export type User = {
	id: string;
	username: string;
	password: string;
	avatarUrl?: string;
	createdAt: Date;
	updatedAt: Date;
	Channels: Channels[];
	Messages: Messages[];
}
export type Channels = {
	id: string;
	name: string;
	members: string[];
	creatorId: string;
	createdAt: Date;
	updatedAt: Date;
	Messages: Messages[];
	User?: User;
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