import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgents } from "../slices/agentsSlice";
import "./agents.css";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const Agents = () => {
  const dispatch = useDispatch();
  const { agents, status, error } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  return (
    <div className="container-fluid">
      {/* Sidebar */}
      <div className="row">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
          style={{ width: "250px" }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <Sidebar />
          </div>
        </div>

        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Sidebar />
        </div>
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            ☰ Menu
          </button>
          <div className="d-flex py-3">
          <h1>Sales Agent List</h1>
          <div className="ms-auto">
            <Link to="/agents/add-new" className="btn btn-primary">
              + Add Agent
            </Link>
            </div>
            </div>
          {status === "loading" ? (
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <ul className="list-group">
            {agents?.map((agent) => (
              <li key={agent._id} className="list-group-item d-flex flex-column">
                <strong className="text-primary">{agent.name}</strong>
                <small className="text-muted">Email: {agent.email}</small>
              </li>
            ))}
          </ul>
          
          )}
          {error && <p>{error}</p>}

          
        </div>
      </div>
    </div>
  );
};

export default Agents;
