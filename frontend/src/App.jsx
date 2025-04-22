import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Leads from "./screens/Leads";
import Agents from "./screens/Agents";
import LeadDetails from "./screens/LeadDetails";
import LeadForm from "./screens/LeadForm";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Report from "./screens/Settings";
import AgentForm from "./screens/AgentForm";
import LeadReport from "./screens/LeadReport";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Settings from "./screens/Settings";

function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/leads/:leadId" element={<LeadDetails />} />
          <Route path="/add-lead" element={<LeadForm />} />
          <Route path="/edit-lead/:leadId" element={<LeadForm />} />

          <Route path="/agents/add-new" element={<AgentForm />} />
          <Route path="/report" element={<LeadReport />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
