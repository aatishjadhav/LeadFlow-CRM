// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div
//       className="p-3 d-flex flex-column align-items-start position-fixed top-0 start-0"
//       style={{
//         width: "210px",
//         backgroundColor: "#f3f0ff",
//         height: "100vh",
//         marginTop: "48px",
//         overflowY: "auto",
//       }}
//     >
//       <ul className="nav flex-column">
//         <li className="nav-item">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `nav-link w-100 px-3 py-2 ${
//                 isActive
//                   ? "bg-secondary text-white rounded-pill"
//                   : "text-secondary"
//               }`
//             }
//           >
//             <i className="bi bi-speedometer2 me-2"></i>Dashboard
//           </NavLink>
//         </li>

//         <li className="nav-item mb-2">
//           <NavLink
//             to="/leads"
//             className={({ isActive }) =>
//               `nav-link ${
//                 isActive
//                   ? "bg-secondary text-white rounded-pill"
//                   : "text-secondary"
//               }`
//             }
//           >
//             <i className="bi bi-kanban me-2"></i>Leads
//           </NavLink>
//         </li>

//         <li className="nav-item mb-2">
//           <NavLink
//             to="/agents"
//             className={({ isActive }) =>
//               `nav-link ${
//                 isActive
//                   ? "bg-secondary text-white rounded-pill"
//                   : "text-secondary"
//               }`
//             }
//           >
//             <i className="bi bi-people me-2"></i>Agents
//           </NavLink>
//         </li>

//         <li className="nav-item mb-2">
//           <NavLink
//             to="/report"
//             className={({ isActive }) =>
//               `nav-link ${
//                 isActive
//                   ? "bg-secondary text-white rounded-pill"
//                   : "text-secondary"
//               }`
//             }
//           >
//             <i className="bi bi-graph-up me-2"></i>Reports
//           </NavLink>
//         </li>

//         <li className="nav-item mb-2">
//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               `nav-link ${
//                 isActive
//                   ? "bg-secondary text-white rounded-pill"
//                   : "text-secondary"
//               }`
//             }
//           >
//             <i className="bi bi-gear me-2"></i>Settings
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column align-items-start position-fixed top-0 start-0"
      style={{
        width: "210px",
        backgroundColor: "#f3f0ff",
        height: "100vh",
        marginTop: "48px",
        overflowY: "auto",
      }}
    >
      <ul className="nav flex-column w-100 m-0 p-0 mt-4">
        <li className="nav-item w-100">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link d-block w-100 ${
                isActive ? "bg-secondary text-white rounded-pill" : "text-secondary"
              }`
            }
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <div className="ps-3">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </div>
          </NavLink>
        </li>

        <li className="nav-item w-100 mt-2">
          <NavLink
            to="/leads"
            className={({ isActive }) =>
              `nav-link d-block w-100 ${
                isActive ? "bg-secondary text-white rounded-pill" : "text-secondary"
              }`
            }
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <div className="ps-3">
              <i className="bi bi-kanban me-2"></i>Leads
            </div>
          </NavLink>
        </li>

        <li className="nav-item w-100 mt-2">
          <NavLink
            to="/agents"
            className={({ isActive }) =>
              `nav-link d-block w-100 ${
                isActive ? "bg-secondary text-white rounded-pill" : "text-secondary"
              }`
            }
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <div className="ps-3">
              <i className="bi bi-people me-2"></i>Agents
            </div>
          </NavLink>
        </li>

        <li className="nav-item w-100 mt-2">
          <NavLink
            to="/report"
            className={({ isActive }) =>
              `nav-link d-block w-100 ${
                isActive ? "bg-secondary text-white rounded-pill" : "text-secondary"
              }`
            }
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <div className="ps-3">
              <i className="bi bi-graph-up me-2"></i>Reports
            </div>
          </NavLink>
        </li>

        <li className="nav-item w-100 mt-2">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link d-block w-100 ${
                isActive ? "bg-secondary text-white rounded-pill" : "text-secondary"
              }`
            }
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <div className="ps-3">
              <i className="bi bi-gear me-2"></i>Settings
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
