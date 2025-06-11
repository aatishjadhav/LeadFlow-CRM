import "./navbar.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/letter-l.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth);
  const handleProfileClick = () => {
    if (user && user.name) {
      navigate("/settings");
    } else {
      toast.info("Please login first!");
    }
  };
  
  return (
    <div className="header">
      <div className="both">
        <div className="cont">
          <img src={logo} alt="" className="logo rounded-circle nav-logo" />
          <p className="heading">LeadFlow</p>
        </div>
        <div className="right">
          <Link
            to="https://github.com/aatishjadhav/LeadFlow-CRM"
            target="_blank"
          >
            <GitHubIcon style={{ fontSize: 35, color: "black" }} />
          </Link>
          <button
            className="bg-transparent border-0 p-0"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
            <PersonOutlineOutlinedIcon
              style={{ fontSize: 38, color: "black" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
