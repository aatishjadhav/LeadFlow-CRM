import { configureStore } from "@reduxjs/toolkit";
import leadsSlice from "../slices/leadsSlice";
import agentsSlice from "../slices/agentsSlice";

export const store = configureStore({
  reducer: {
    leads: leadsSlice,
    agents: agentsSlice,
  },
});
