import { createSlice } from "@reduxjs/toolkit";

export const leadsSlice = createSlice({
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
