import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://anvaya-backend-zeta.vercel.app";

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (filters) => {
    const response = await axios.get(`${BASE_URL}/leads`, { params: filters });
    console.log("response from slice", response);

    return response.data;
  }
);

export const addNewLead = createAsyncThunk(
  "leads/addNewlead",
  async (leadData) => {
    const response = await axios.post(`${BASE_URL}/leads`, leadData);
    console.log("response from slice", response);

    return response.data;
  }
);

export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ leadId, leadData }) => {
    const response = await axios.put(`${BASE_URL}/leads/${leadId}`, leadData);
    console.log("response from slice", response);

    return response.data;
  }
);

export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId) => {
    const response = await axios.delete(`${BASE_URL}/leads/${leadId}`);
    console.log("response from slice", response);

    return leadId;
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = action.payload;
    });
    builder.addCase(addNewLead.fulfilled, (state, action) => {
      state.status = "success";
      state.leads.push(action.payload);
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = state.leads.map((lead) =>
        lead._id === action.payload.id ? action.payload : lead
      );
    });
    builder.addCase(deleteLead.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = state.leads.filter((lead) => lead._id !== action.payload);
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default leadsSlice.reducer;
