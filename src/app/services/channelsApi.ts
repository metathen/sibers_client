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
				method: "POST",
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
		getAllMessages: builder.mutation<Messages[], {channelId: string}>({
			query: (allMesagesData) => ({
				url: '/get-messages',
				method: "POST",
				body: allMesagesData
			})
		}),
		getChannelById: builder.query<Channels, string>({
			query: (id) => ({
				url: `/channels/${id}`,
				method: "GET"
			}),
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

export const {
	useCreateChannelMutation,
	useAddUserMutation,
	useJoinChannelMutation,
	useDeleteUserMutation,
	useSendMessageMutation,
	useGetAllMessagesMutation,
	useGetChannelByIdQuery,
	useLazyGetChannelByIdQuery
} = channelsApi

export const {
	endpoints: {
		createChannel, addUser, joinChannel, deleteUser, getAllMessages, getChannelById, sendMessage
	}
} = channelsApi;