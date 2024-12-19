import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Channel = {
  id: string;
  name: string;
};

type ChannelState = {
  channels: Channel[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: ChannelState = {
  channels: [],
  status: 'idle',
};

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
  const response = await fetch('/api/channels');
  const data = await response.json();
  return data as Channel[];
});

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default channelSlice.reducer;