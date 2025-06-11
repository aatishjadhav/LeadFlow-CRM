import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchAgents = createAsyncThunk("agents/fetchAgents", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/agents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const addNewAgent = createAsyncThunk(
  "agents/addNewAgent",
  async (agent) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/agents`, agent, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
