import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Leads from "./screens/Leads";
import Agents from "./screens/Agents";
import LeadDetails from "./screens/LeadDetails";
import LeadForm from "./screens/LeadForm";

 const homeMenu = [
    { name: "Leads", link: "/leads" },
    { name: "Sales", link: "/sales" },
    { name: "Agents", link: "/agents" },
    { name: "Reports", link: "/reports" },
    { name: "Settings", link: "/settings" },
 ];
  
const leadMenu = [
  { name: <>Back to <br /> Dashboard</>, link: "/" }
 ]

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home homeMenu={homeMenu} />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/leads/:leadId" element={<LeadDetails leadMenu={leadMenu} />} />
          <Route path="/add-lead" element={<LeadForm/>} />
          <Route path="/edit-lead/:leadId" element={<LeadForm/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
