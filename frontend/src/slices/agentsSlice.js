import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://anvaya-backend-zeta.vercel.app";

export const fetchAgents = createAsyncThunk("agents/fetchAgents", async () => {
  const response = await axios.get(`${BASE_URL}/agents`);
  console.log("response from agent slice", response);

  return response.data;
});

export const addNewAgent = createAsyncThunk(
  "agents/addNewAgent",
  async (agent) => {
    const response = await axios.post(`${BASE_URL}/agents`, agent);
    console.log("response from agent slice", response);
    return response.data;
  }
);

export const agentsSlice = createSlice({
  name: "agents",
  initialState: {
    agents: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAgents.pending, (state, action) => {
      state.status = "loading";
      state.agents = action.payload;
    });
    builder.addCase(fetchAgents.fulfilled, (state, action) => {
      state.status = "success";
      state.agents = action.payload;
    });
    builder.addCase(fetchAgents.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addNewAgent.fulfilled, (state, action) => {
      state.status = "success";
      state.agents.push(action.payload);
    });
  },
});

export default agentsSlice.reducer;
