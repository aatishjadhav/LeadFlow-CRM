import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./screens/Home";
import Leads from "./screens/Leads";
import Agents from "./screens/Agents";
import LeadDetails from "./screens/LeadDetails";
import LeadForm from "./screens/LeadForm";
import Sidebar from "./components/Sidebar";
import "./index.css";
import Report from "./screens/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
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
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/register"];
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
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        <div style={{ marginTop: "40px" }}>
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/leads/:leadId" element={<LeadDetails />} />
            <Route path="/report" element={<LeadReport />} />
            <Route path="/settings" element={<Profile />} />

            {/* Protected Routes */}
            <Route
              path="/add-lead"
              element={
                <ProtectedRoute
                  element={<LeadForm />}
                  allowedRoles={["agent"]}
                />
              }
            />
            <Route
              path="/edit-lead/:leadId"
              element={
                <ProtectedRoute
                  element={<LeadForm />}
                  allowedRoles={["agent"]}
                />
              }
            />
            <Route
              path="/agents/add-new"
              element={
                <ProtectedRoute
                  element={<AgentForm />}
                  allowedRoles={["admin"]}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
