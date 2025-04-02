import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Leads from "./screens/Leads";
import Agents from "./screens/Agents";
import LeadDetails from "./screens/LeadDetails";
import LeadForm from "./screens/LeadForm";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Report from "./screens/Reports";
import AgentForm from "./screens/AgentForm";
import LeadReport from "./screens/LeadReport";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="side">
          <Sidebar />
        </div>

        <div className="route">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/leads/:leadId" element={<LeadDetails />} />
            <Route path="/add-lead" element={<LeadForm />} />
            <Route path="/edit-lead/:leadId" element={<LeadForm />} />

            <Route path="/agents/add-new" element={<AgentForm />} />
            <Route path="/report" element={<LeadReport />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
