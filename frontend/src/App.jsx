import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Leads from "./screens/Leads";
import Agents from "./screens/Agents";
 const homeMenu = [
    { name: "Leads", link: "/leads" },
    { name: "Sales", link: "/sales" },
    { name: "Agents", link: "/agents" },
    { name: "Reports", link: "/reports" },
    { name: "Settings", link: "/settings" },
  ];

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home homeMenu={homeMenu} />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/agents" element={<Agents/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
