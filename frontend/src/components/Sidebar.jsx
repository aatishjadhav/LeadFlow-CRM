import "./sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = ({ menuItems }) => {
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
};

export default Sidebar;
