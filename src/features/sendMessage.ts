import { ADD_MESSAGE } from './action';
import { Channels, Messages } from '../app/types';

type MessagesState = {
  messages: Messages[];
}

const initialState: MessagesState = {
  messages: [],
};

interface AddChannelAction {
  type: 'channels/add';
  payload: Channels;
}

type ChannelActions = AddChannelAction;

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

const channelsReducer = (state = [], action: ChannelActions): Channels[] => {
  switch (action.type) {
    case 'channels/add':
      return [...state, action.payload];
    default:
      return state;
  }
};