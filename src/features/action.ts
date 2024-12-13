import { Messages } from '../app/types';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = (message: Messages) => ({
  type: ADD_MESSAGE,
  payload: message,
});