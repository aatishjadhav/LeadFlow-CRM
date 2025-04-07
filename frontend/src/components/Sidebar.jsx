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

import { useLocation } from "react-router-dom";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

const homeMenu = [
  { name: "Leads", link: "/leads" },
  { name: "Sales", link: "/sales" },
  { name: "Agents", link: "/agents" },
  { name: "Reports", link: "/report" },
  { name: "Settings", link: "/settings" },
];

const backMenu = [
  {
    name: (
      <>
        Back to <br /> Dashboard
      </>
    ),
    link: "/",
  },
];

function Sidebar() {
  const location = useLocation();

  // Routes that should show "Back to Dashboard"
  const showBackOption =
    ["/leads", "/agents", "/report", "/add-lead", "/agents/add-new"].includes(location.pathname) ||
    location.pathname.startsWith("/leads/") ||
    location.pathname.startsWith("/edit-lead");

  // Choose the appropriate menu
  const menuItems = showBackOption ? backMenu : homeMenu;

  return (
    <div className="sidebar">
      
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="list-items">
            <Link to={item.link} className="list-items nav-link">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;


