import { Channels, Messages } from "../types";
import { api } from "./api";

export const channelsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		createChannel: builder.mutation<Channels, {name: string}>({
			query: (channelData) => ({
				url: "/create",
				method: "POST",
				body: channelData
			})
		}),
		addUser: builder.mutation<{channelId: string, userId: string}, {channelId: string, userId: string}>({
			query: (channelData) => ({
				url: '/add',
				method: "PUT",
				body: channelData
			})
		}),
		joinChannel: builder.mutation<Channels, {channelId: string}>({
			query: (joinData) => ({
				url: "/join",
				method: "POST",
				body: joinData
			})
		}),
		deleteUser: builder.mutation<{channelId: string; userId: string}, {channelId: string; userId: string}>({
			query: (deleteData) => ({
				url: '/delete',
				method: "DELETE",
				body: deleteData
			})
		}),
		sendMessage: builder.mutation<Messages, {channelId: string; text: string}>({
			query: (messageData) => ({
				url: '/send-message',
				method: "POST",
				body: messageData
			})
		})
	})
})

const {
	useCreateChannelMutation,
	useAddUserMutation,
	useJoinChannelMutation,
	useDeleteUserMutation,
	useSendMessageMutation
} = channelsApi

export const {
	endpoints: {
		createChannel, addUser, joinChannel, deleteUser, sendMessage
	}
} = channelsApi;