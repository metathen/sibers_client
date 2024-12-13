import { ADD_MESSAGE } from './action';
import { Messages } from '../app/types';

type MessagesState = {
  messages: Messages[];
}

const initialState: MessagesState = {
  messages: [],
};

export const messagesReducer = (state = initialState, action: any): MessagesState => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload], // add new message
      };

    default:
      return state;
  }
};