import { createSlice } from "@reduxjs/toolkit";
import { User } from "../app/types";
import { userApi } from "../app/services/userApi";
import { RootState } from "../app/store";

interface InitialState {
	user: User | null;
	isAuthenticated: boolean;
	users: User[] | null;
	current: User | null;
	token?: string;
}

const initialState: InitialState = {
	user: null,
	isAuthenticated: false,
	users: null,
	current: null
}

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: () => initialState, //resets data
		resetUser: (state) => {
			state.user = null
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {  //if sign in was succes
			state.token = action.payload.token //add token
			state.isAuthenticated = true //changes status auth
		})
		.addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => { //if current function was succesfuly
			state.isAuthenticated = true //changes status auth
			state.user = action.payload; //saves a user data
		})
	}
})

export const {logout, resetUser} = slice.actions;
export default slice.reducer

export const selectIsAuth = (state: RootState) => state.auth.isAuthenticated

export const selectCurrent = (state: RootState) => state.auth.current
export const selectUser = (state: RootState) => state.auth.user