import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./screens/Home";
import Leads from "./screens/Leads";
import Agents from "./screens/Agents";
import LeadDetails from "./screens/LeadDetails";
import LeadForm from "./screens/LeadForm";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Report from "./screens/Reports";
import AgentForm from "./screens/AgentForm";

function App() {
  return (
    <>
      <h1 className="heading" style={{ textAlign: "center" }}>
        Anvaya CRM Dashboard
      </h1>
      <div className="main">
        <Sidebar />

        <div className="route">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/leads/:leadId" element={<LeadDetails />} />
            <Route path="/add-lead" element={<LeadForm />} />
            <Route path="/edit-lead/:leadId" element={<LeadForm />} />
            <Route path="/report" element={<Report />} />
            <Route path="/agents/add-new" element={<AgentForm/>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
