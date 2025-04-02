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

export const fetchComments = createAsyncThunk("leads/fetchComments", async (leadId) => {
  const response = await axios.get(`${BASE_URL}/leads/${leadId}/comments`);
  console.log("response from slice", response);

  return response.data;
});

// export const fetchLeadsInPipeline = createAsyncThunk("leads/fetchLeadsInPipeline", async () => {
//   const response = await axios.get(`${BASE_URL}/report/pipeline`);
//   console.log("pipeline", response);
//   return response.data;
// });

// Fetch leads in the pipeline
export const fetchPipelineData = createAsyncThunk(
  "leads/fetchPipelineData",
  async () => {
    const response = await axios.get(`${BASE_URL}/report/pipeline`);
    return response.data;
  }
);

export const fetchClosedLeads = createAsyncThunk("leads/fetchClosedLeads", async () => {
  const response = await axios.get(`${BASE_URL}/report/last-week`);
  console.log("closed", response);
  return response.data;
})

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

export const { setFilterStatus } = leadsSlice.actions;

export default leadsSlice.reducer;
