import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Leads from "./screens/Leads";
import Agents from "./screens/Agents";
import LeadDetails from "./screens/LeadDetails";
import LeadForm from "./screens/LeadForm";
import Sidebar from "./components/Sidebar";
import "./App.css";
import "./index.css";
import Report from "./screens/Settings";
import AgentForm from "./screens/AgentForm";
import LeadReport from "./screens/LeadReport";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Settings from "./screens/Settings";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #253053 31%, #079E83 100%)",
              color: "#fff",
            },
          }}
        />

        <div style={{ marginTop: "40px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Home />} />

            <Route path="/leads" element={<Leads />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/leads/:leadId" element={<LeadDetails />} />
            <Route path="/add-lead" element={<LeadForm />} />
            <Route path="/edit-lead/:leadId" element={<LeadForm />} />

            <Route path="/agents/add-new" element={<AgentForm />} />
            <Route path="/report" element={<LeadReport />} />
            <Route path="/settings" element={<Profile />} />
          </Routes>
        </div>
        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      </div>
    </>
  );
}

export default App;
