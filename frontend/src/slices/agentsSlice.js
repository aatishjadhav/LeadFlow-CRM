import { createSlice } from "@reduxjs/toolkit";

export const agentsSlice = createSlice({
  name: "agents",
  initialState: {
    agents: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default agentsSlice.reducer;
