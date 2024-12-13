import { combineReducers } from 'redux';
import { messagesReducer } from './sendMessage';

export const rootReducer = combineReducers({
  messages: messagesReducer,
});