import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (filters) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/leads`, { params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchComments = createAsyncThunk("leads/fetchComments", async (leadId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/lead/${leadId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const addComments = createAsyncThunk("leads/addComments", async ({ leadId, author, commentText }) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/lead/${leadId}/comments`, {author, commentText}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const fetchPipelineData = createAsyncThunk(
  "leads/fetchPipelineData",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/leads/report/pipeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchClosedLeads = createAsyncThunk("leads/fetchClosedLeads", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/leads/report/last-week`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
})

export const addNewLead = createAsyncThunk(
  "leads/addNewlead",
  async (leadData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/leads`, leadData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ leadId, leadData }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BASE_URL}/leads/${leadId}`, leadData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/leads/${leadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return leadId;
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    comments: [],
    closedLeads: [],
    totalLeadsInPipeline: 0,
    filterStatus: "",
    status: "idle",
    error: null,
  },
  reducers: {
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = action.payload;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "success";
      state.comments = action.payload;
    });
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.status = "success";
      state.comments.push(action.payload);
    });
    builder.addCase(fetchPipelineData.fulfilled, (state, action) => {
      state.totalLeadsInPipeline = action.payload.totalLeadsInPipeline;
    });
    builder.addCase(fetchClosedLeads.fulfilled, (state, action) => {
      state.status = "success";
      state.closedLeads = action.payload;
    });
   
    builder.addCase(addNewLead.fulfilled, (state, action) => {
      state.status = "success";
      state.leads.push(action.payload);
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = state.leads.map((lead) =>
        lead._id === action.payload._id ? action.payload : lead
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

export const { setFilterStatus } = leadsSlice.actions;

export default leadsSlice.reducer;
