import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
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
          <Route path="/" element={<Home homeMenu={homeMenu}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
