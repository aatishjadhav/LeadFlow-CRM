// import "./sidebar.css";
// import { Link } from "react-router-dom";
// const Sidebar = ({ menuItems }) => {
//   return (
//     <div className="sidebar">
//       <ul>
//         {menuItems.map((item, index) => (
//           <li key={index} className="list-items">
//             <Link to={item.link} className="list-items nav-link">
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

// import { useLocation } from "react-router-dom";
// import "./sidebar.css";
// import { Link } from "react-router-dom";
// import { MdMenu, MdClose } from "react-icons/md";

// const homeMenu = [
//   { name: "Leads", link: "/leads" },
//   { name: "Sales", link: "/sales" },
//   { name: "Agents", link: "/agents" },
//   { name: "Reports", link: "/report" },
//   { name: "Settings", link: "/settings" },
// ];

// const backMenu = [
//   {
//     name: (
//       <>
//         Back to <br /> Dashboard
//       </>
//     ),
//     link: "/",
//   },
// ];

// function Sidebar() {
//   const location = useLocation();

//   // Routes that should show "Back to Dashboard"
//   const showBackOption =
//     ["/leads", "/agents", "/report", "/add-lead", "/agents/add-new"].includes(location.pathname) ||
//     location.pathname.startsWith("/leads/") ||
//     location.pathname.startsWith("/edit-lead");

//   // Choose the appropriate menu
//   const menuItems = showBackOption ? backMenu : homeMenu;

//   return (
//     <div className="sidebar">
      
//       <ul>
//         {menuItems.map((item, index) => (
//           <li key={index} className="list-items">
//             <Link to={item.link} className="list-items nav-link">
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;


import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="p-3 vh-100 d-flex flex-column align-items-center"
      style={{ width: "230px", backgroundColor: "#f3f0ff" }}
    >
      <h4 className="mb-4 text-info text-md">LeadFlow</h4>
      <ul className="nav flex-column py-3">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-secondary">
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </Link>
        </li>
        <li className="nav-item mt-2">
          <Link to="/leads" className="nav-link text-secondary">
            <i className="bi bi-kanban me-2"></i>Leads
          </Link>
        </li>
        <li className="nav-item mt-2">
          <Link to="/agents" className="nav-link text-secondary">
            <i className="bi bi-people me-2"></i>Agents
          </Link>
        </li>
        <li className="nav-item mt-2">
          <Link to="/report" className="nav-link text-secondary">
            <i className="bi bi-graph-up me-2"></i>Reports
          </Link>
        </li>
        <li className="nav-item mt-2">
          <Link to="/settings" className="nav-link text-secondary">
            <i className="bi bi-gear me-2"></i>Setting
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

