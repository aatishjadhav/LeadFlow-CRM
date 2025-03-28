import { createSlice } from "@reduxjs/toolkit";
const BASE_URL = "anvaya-backend-zeta.vercel.app";

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default leadsSlice.reducer;
