import { useState } from "react";
import "./agents.css";
import { useDispatch } from "react-redux";
import { addNewAgent } from "../slices/agentsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const AgentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAgent = { name, email };
    dispatch(addNewAgent(newAgent));
    toast.success("New Sales agent added.");
    navigate("/agents");
  };
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
          <h1>Add New Sales Agent</h1>
    
          <form
            onSubmit={handleSubmit}
            className="container mt-4 p-4 border rounded shadow bg-light"
          >
            <h3 className="mb-4 text-primary">Create Agent</h3>

            <div className="mb-3">
              <label htmlFor="agentName" className="form-label">
                Agent Name:
              </label>
              <input
                type="text"
                id="agentName"
                className="form-control"
                placeholder="Enter agent name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Create Agent
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentForm;
